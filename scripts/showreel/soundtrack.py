"""Synthesize the showreel soundtrack (15 s, 120 BPM, A minor) -> out/soundtrack.wav.

Every hit is locked to the visual timeline in showreel.html (same constants):
drops at 2.0 s and 12.5 s, whooshes into each scene cut, typing clicks in the
boot terminal, counter ticks on the stats, blips on the stack tiles.

    pip install numpy scipy
    python3 scripts/showreel/soundtrack.py
"""
import os
import wave

import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
DUR = 15.0
N = int(SR * DUR)
BEAT = 0.5
rng = np.random.default_rng(7)

L = np.zeros(N)
R = np.zeros(N)
RL = np.zeros(N)  # reverb send
RR = np.zeros(N)


def tvec(d):
    return np.arange(int(d * SR)) / SR


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def filt(x, kind, f, order=2):
    if kind == "band":
        sos = butter(order, [f[0] / (SR / 2), f[1] / (SR / 2)], btype="band", output="sos")
    else:
        sos = butter(order, f / (SR / 2), btype=kind, output="sos")
    return sosfilt(sos, x)


def place(sig, t0, gain=1.0, pan=0.0, send=0.0):
    """Mix a mono signal at time t0 with constant-power pan and optional reverb send."""
    i0 = int(round(t0 * SR))
    if i0 >= N:
        return
    if i0 < 0:
        sig = sig[-i0:]
        i0 = 0
    sig = sig[: N - i0]
    a = (pan + 1) * np.pi / 4
    gl, gr = np.cos(a) * gain, np.sin(a) * gain
    L[i0 : i0 + len(sig)] += sig * gl
    R[i0 : i0 + len(sig)] += sig * gr
    if send:
        RL[i0 : i0 + len(sig)] += sig * gl * send
        RR[i0 : i0 + len(sig)] += sig * gr * send


def saw(f, t, bright=1.0):
    out = np.zeros_like(t)
    k = 1
    while k * f < min(16000, 6000 * bright + f):
        out += np.sin(2 * np.pi * k * f * t) / k
        k += 1
    return out * 0.6


def noise(d):
    return rng.standard_normal(int(d * SR))


# ── instruments ────────────────────────────────────────────
def kick(t0, g=1.0):
    t = tvec(0.5)
    f = 44 + 120 * np.exp(-t * 30)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7.0)
    click = filt(noise(0.5), "high", 1500) * np.exp(-t * 350) * 0.5
    place(np.tanh(1.8 * (body + click)) * 0.9, t0, g)


def clap(t0, g=1.0):
    t = tvec(0.35)
    n = filt(noise(0.35), "band", (900, 4200))
    env = np.zeros_like(t)
    for off in (0.0, 0.009, 0.018):
        env += np.where(t >= off, np.exp(-(t - off) * 180), 0)
    env += np.where(t >= 0.02, np.exp(-(t - 0.02) * 16), 0) * 0.55
    place(n * env * 0.5, t0, g, 0.0, send=0.35)


def hat(t0, g=1.0, open_=False, pan=0.2):
    d = 0.25 if open_ else 0.06
    t = tvec(d)
    n = filt(noise(d), "high", 7500)
    place(n * np.exp(-t * (18 if open_ else 90)) * 0.28, t0, g, pan)


def crash(t0, g=1.0, d=1.8):
    t = tvec(d)
    n = filt(noise(d), "high", 3500)
    place(n * np.exp(-t * 2.4) * 0.3, t0, g, -0.2, send=0.5)
    place(filt(noise(d), "high", 3500) * np.exp(-t * 2.4) * 0.3, t0, g, 0.2, send=0.5)


def impact(t0, g=1.0):
    t = tvec(1.6)
    f = 32 + 45 * np.exp(-t * 6)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.6)
    place(np.tanh(2.2 * boom) * 0.8, t0, g, send=0.15)
    kick(t0, 1.0 * g)
    crash(t0, 0.9 * g)
    # low noise thump
    th = filt(noise(0.4), "low", 400) * np.exp(-tvec(0.4) * 12)
    place(th * 0.6, t0, g)


def swept_noise(d, lo, hi, curve="up", bands=8):
    """Noise whose spectral centre moves lo->hi (or up-down) over d seconds, click-free."""
    t = tvec(d)
    n = len(t)
    centres = np.geomspace(lo, hi, bands)
    out = np.zeros(n)
    if curve == "up":
        pos = (t / d) ** 1.6
    else:  # up then down
        pos = np.sin(np.pi * t / d)
    for i, c in enumerate(centres):
        band = filt(noise(d), "band", (c / 1.5, min(c * 1.5, SR / 2 - 100)))
        target = i / (bands - 1)
        out += band * np.exp(-((pos - target) ** 2) / 0.02)
    return out


def riser(t_end, d, g=1.0):
    n = swept_noise(d, 250, 9000, "up")
    t = tvec(d)
    env = (t / d) ** 2.2
    tone_f = 180 * (1600 / 180) ** ((t / d) ** 1.4)
    tone = np.sin(2 * np.pi * np.cumsum(tone_f) / SR) * 0.18
    sig = (n * 0.45 + tone) * env
    place(sig, t_end - d, g * 0.8, -0.3, send=0.3)
    place(sig[::-1][::-1] * 1.0, t_end - d, g * 0.8, 0.3, send=0.3)


def whoosh(t_cut, d=0.4, g=1.0):
    n = swept_noise(d, 300, 7000, "updown", bands=7)
    t = tvec(d)
    env = np.sin(np.pi * t / d) ** 2 * np.minimum(1, (t / d) * 1.4)
    for i, pan in enumerate(np.linspace(-0.8, 0.8, 8)):
        seg = slice(int(i * len(t) / 8), int((i + 1) * len(t) / 8))
        s = np.zeros_like(t)
        s[seg] = (n * env)[seg]
        place(s * 0.55, t_cut - d * 0.75, g, pan, send=0.25)


def swish(t0, g=1.0):
    d = 0.16
    n = swept_noise(d, 1200, 9000, "up", bands=6)
    t = tvec(d)
    env = np.sin(np.pi * t / d) ** 1.5
    place(n * env * 0.5, t0 - 0.08, g, 0.4, send=0.15)
    tom_f = 140 * np.exp(-tvec(0.25) * 5) + 60
    tom = np.sin(2 * np.pi * np.cumsum(tom_f) / SR) * np.exp(-tvec(0.25) * 14)
    place(tom * 0.35, t0, g, -0.1)


def click(t0, g=1.0, pan=0.0):
    d = 0.03
    t = tvec(d)
    c = filt(noise(d), "band", (1800, 6500)) * np.exp(-t * 400)
    thock = np.sin(2 * np.pi * (380 + rng.uniform(-40, 40)) * t) * np.exp(-t * 200) * 0.6
    place((c + thock) * 0.45, t0, g * rng.uniform(0.7, 1.0), pan)


def blip(t0, f, g=1.0, d=0.18, pan=0.0, send=0.35):
    t = tvec(d)
    s = (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t) + 0.1 * np.sin(2 * np.pi * 3 * f * t))
    s *= np.exp(-t * 22) * np.minimum(1, t * 800)
    place(s * 0.22, t0, g, pan, send)


def tick(t0, g=1.0):
    t = tvec(0.02)
    place(np.sin(2 * np.pi * 2600 * t) * np.exp(-t * 300) * 0.16, t0, g, 0.15)


# ── harmony ────────────────────────────────────────────
AM, F, C, G, E = "Am", "F", "C", "G", "E"
CHORDS = {
    AM: dict(root=33, pad=[57, 60, 64, 67], arp=[69, 72, 76, 79]),
    F: dict(root=29, pad=[53, 57, 60, 64], arp=[65, 69, 72, 76]),
    C: dict(root=36, pad=[55, 60, 64, 67], arp=[67, 72, 76, 79]),
    G: dict(root=31, pad=[55, 59, 62, 67], arp=[67, 71, 74, 79]),
    E: dict(root=28, pad=[56, 59, 64, 68], arp=[68, 71, 76, 80]),
}
TIMELINE = [(0, 4, AM), (4, 6, F), (6, 8, C), (8, 10, G), (10, 12, AM), (12, 12.5, E), (12.5, 13.5, F), (13.5, 14.5, G), (14.5, 15, AM)]


def chord_at(t):
    for a, b, c in TIMELINE:
        if a <= t < b:
            return CHORDS[c]
    return CHORDS[AM]


KICKS = [2 + i * BEAT for i in range(21)] + [12.5, 13.5, 14.5]


def duck_env():
    t = np.arange(N) / SR
    d = np.ones(N)
    for k in KICKS:
        m = t >= k
        d[m] = np.minimum(d[m], 1 - 0.75 * np.exp(-(t[m] - k) * 11))
    return d


def pad_track():
    out = np.zeros(N)
    for a, b, c in TIMELINE:
        d = b - a + 0.06
        t = tvec(d)
        s = np.zeros_like(t)
        for m in CHORDS[c]["pad"]:
            for det in (-0.08, 0.08):
                s += saw(hz(m + det), t + rng.uniform(0, 1), bright=0.35)
        env = np.minimum(1, t / 0.03) * np.minimum(1, (d - t) / 0.05)
        seg = s * env
        i0 = int(a * SR)
        out[i0 : i0 + len(seg)] += seg[: N - i0]
    out = filt(out, "low", 1400)
    t = np.arange(N) / SR
    level = np.interp(t, [0, 1.9, 2.0, 12.0, 12.5, 12.6, 15], [0.02, 0.2, 0.12, 0.12, 0.22, 0.16, 0.14])
    return out * level


def bass_track():
    out = np.zeros(N)
    t0 = 2.0
    while t0 < 12.0:
        c = chord_at(t0 + 0.01)
        step = int(round((t0 - 2) / 0.25))
        m = c["root"] + (12 if step % 4 == 3 else 0)
        d = 0.23
        t = tvec(d)
        s = saw(hz(m), t, bright=0.25) + 0.6 * np.sin(2 * np.pi * hz(m) * t)
        s *= np.minimum(1, t / 0.004) * np.exp(-t * 3) * np.minimum(1, (d - t) / 0.01)
        i0 = int(t0 * SR)
        out[i0 : i0 + len(s)] += s
        t0 += 0.25
    for a, m, d in [(12.5, 29, 1.0), (13.5, 31, 1.0), (14.5, 33, 0.5)]:
        t = tvec(d)
        s = saw(hz(m), t, bright=0.25) + 0.6 * np.sin(2 * np.pi * hz(m) * t)
        s *= np.minimum(1, t / 0.004) * np.exp(-t * 1.2) * np.minimum(1, (d - t) / 0.02)
        i0 = int(a * SR)
        out[i0 : i0 + len(s)] += s[: N - i0]
    return filt(out, "low", 420) * 0.34


def arp_track():
    pattern = [0, 1, 2, 3, 2, 1, 2, 3]
    t0 = 4.5
    i = 0
    while t0 < 14.5:
        if 12.0 <= t0 < 12.5:
            t0 += 0.125
            i += 1
            continue
        c = chord_at(t0 + 0.01)
        m = c["arp"][pattern[i % len(pattern)]] + (12 if (i // 8) % 2 and 7 <= t0 < 10.5 else 0)
        d = 0.2
        t = tvec(d)
        s = saw(hz(m), t, bright=0.8) * np.exp(-t * 16) * np.minimum(1, t / 0.002)
        s = filt(s, "low", 3800)
        g = 0.12 if t0 < 7 else 0.16 if t0 < 12 else 0.1
        place(s, t0, g, -0.45 if i % 2 else 0.45, send=0.45)
        t0 += 0.125
        i += 1


def lead_stabs():
    # chord stabs on the big moments
    for a, c, g in [(2.0, AM, 0.5), (12.5, F, 0.6), (14.5, AM, 0.5)]:
        d = 1.2
        t = tvec(d)
        s = np.zeros_like(t)
        for m in CHORDS[c]["arp"]:
            s += saw(hz(m), t, bright=0.6)
        s = filt(s, "low", 3000) * np.exp(-t * 3.2) * np.minimum(1, t / 0.003)
        place(s * 0.12, a, g, -0.2, send=0.6)
        place(s * 0.12, a + 0.012, g, 0.2, send=0.6)


# ── arrangement ────────────────────────────────────────────
# intro (0 – 2 s): boot sequence
riser(2.0, 2.0, 0.9)
TYPE1, TYPE3, BAR = (0.40, 0.70), (0.95, 1.22), (1.26, 1.58)
for text, (a, b) in (("whoami", TYPE1), ("./showreel --play", TYPE3)):
    n = len(text)
    for k in range(1, n + 1):
        click(a + (k - 0.5) / n * (b - a), 0.9, rng.uniform(-0.3, 0.3))
click(0.8, 1.3)
click(1.26, 1.3)
# progress bar blips (ease-in-out, 16 slots)
ts = np.linspace(0, 1, 4000)
ease = np.where(ts < 0.5, 4 * ts**3, 1 - (-2 * ts + 2) ** 3 / 2)
prev = 0
for i, e in enumerate(ease):
    s = int(round(e * 16))
    if s > prev:
        blip(BAR[0] + ts[i] * (BAR[1] - BAR[0]), hz(84 + s % 3 * 2), 0.35, d=0.05, send=0.1)
        prev = s
blip(1.6, hz(88), 0.9, d=0.3)
blip(1.68, hz(93), 0.9, d=0.4)
for k in (0.5, 1.0, 1.5):
    hat(k, 0.6)
# ambient drone under the intro
t = tvec(2.0)
drone = (np.sin(2 * np.pi * 55 * t) + 0.5 * np.sin(2 * np.pi * 110.3 * t)) * (t / 2) ** 1.5
place(drone * 0.18, 0.0)

# drops
impact(2.0, 1.0)
impact(12.5, 1.1)
impact(9.72, 0.45)

# groove (2 – 12 s)
for k in KICKS:
    kick(k, 0.95)
for b in np.arange(2.5, 12.0, 1.0):
    clap(b, 0.85)
for b in np.arange(2.25, 12.0, 0.5):
    hat(b, 0.85, open_=(int((b - 2.25) / 0.5) % 4 == 3))
for b in np.arange(7.0, 10.5, 0.125):  # 16th hats drive the project montage
    if abs((b - 2.25) % 0.5) > 1e-6:
        hat(b, 0.35, pan=-0.3)
# snare roll into the stack scene & into the CTA drop
for i, b in enumerate(np.arange(11.5, 12.0, 0.0625)):
    clap(b, 0.25 + i * 0.07)
# outro groove (12.5 – 15 s)
for b in (13.0, 14.0):
    clap(b, 0.8)
for b in np.arange(12.75, 15.0, 0.5):
    hat(b, 0.6)

# transitions
for cut in (4.5, 7.0, 10.5):
    whoosh(cut, 0.45, 1.0)
for cut in (7.5, 8.0, 8.5, 9.0, 9.5):
    swish(cut, 0.9)
riser(12.5, 1.0, 0.8)

# stats counters: ticks that slow down (outExpo) + a ding at the end
COUNT = [(4.55, 5.25), (5.05, 5.75), (5.55, 6.25)]
for j, (a, b) in enumerate(COUNT):
    ts = np.linspace(0, 1, 2000)
    val = np.where(ts >= 1, 1, 1 - 2 ** (-10 * ts))
    prev = 0
    for i, v in enumerate(val):
        s = int(v * 18)
        if s > prev:
            tick(a + ts[i] * (b - a), 0.8)
            prev = s
    blip(b, hz(81 + j * 3), 0.8, d=0.35)

# stack tiles: ascending pentatonic blips
PENTA = [69, 72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96]
for i, m in enumerate(PENTA):
    blip(10.62 + i * 0.06, hz(m), 0.55, d=0.2, pan=[-0.5, 0, 0.5][i % 3])

# music beds
duck = duck_env()
pad = pad_track() * duck
bass = bass_track() * duck
L += pad
R += pad
RL += pad * 0.4
RR += pad * 0.4
L += bass
R += bass
arp_track()
lead_stabs()

# ── reverb + master ────────────────────────────────────────
tir = tvec(2.2)
irL = filt(rng.standard_normal(len(tir)), "low", 6000) * np.exp(-tir / 0.42)
irR = filt(rng.standard_normal(len(tir)), "low", 6000) * np.exp(-tir / 0.42)
irL /= np.sqrt(np.sum(irL**2))
irR /= np.sqrt(np.sum(irR**2))
wetL = fftconvolve(filt(RL, "high", 200), irL)[:N]
wetR = fftconvolve(filt(RR, "high", 200), irR)[:N]
L += wetL * 0.9
R += wetR * 0.9

mix = np.stack([L, R])
mix = filt(mix, "high", 28)
mix = np.tanh(1.1 * mix / np.max(np.abs(mix))) / np.tanh(1.1)  # gentle glue, keeps transients
t = np.arange(N) / SR
fade = np.minimum(1, t / 0.01) * np.clip((DUR - t) / 0.35, 0, 1) ** 1.5
mix *= fade
mix *= 0.8 / np.max(np.abs(mix))  # ~-2 dBFS headroom for AAC

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out", "soundtrack.wav")
os.makedirs(os.path.dirname(out), exist_ok=True)
pcm = (mix.T * 32767).astype("<i2")
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", out)
