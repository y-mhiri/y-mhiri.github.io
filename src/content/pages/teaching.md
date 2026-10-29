---
title: Teaching
---

Teaching at the Electrical Engineering and Industrial Computing department (GEII) of [IUT d'Annecy](https://www.univ-smb.fr/iut-annecy/formation/genie-electrique/) at Bachelor level.


<!--
One block per course:

## Course title

*Level · semester · module code · format*

Two or three sentences: what the course is about, how it is taught.

**Topics:** topic · topic · topic

**Material:** [slides](/files/teaching/...) · [exercises](/files/teaching/...) · [code](https://github.com/...)

Course files go in public/files/teaching/ and are linked as /files/teaching/<file>.
-->

## Introduction to Fourier Analysis

*Undergraduate, 2nd year · Semester 3 · Module OML3 · 3 chapters, 7 tutorials, 6 Python labs*
<!-- 
From periodic signals to their discrete spectrum: Fourier series, Fourier transform, then the discrete Fourier transform computed on real data. Labs are Jupyter notebooks built around measured signals: reading the stimulation frequency in an EEG recording of a brain–computer interface, removing 50 Hz mains interference, and, for the graded lab, extracting heart and breathing rates from an ECG. Tutorials end with two applications: the frequency resolution needed to separate musical notes, and observing stars with two telescopes. -->

**Topics:** periodic signals and mean values · Fourier series · Fourier transform · Dirac impulse, Dirac comb and convolution · autocorrelation · discrete-time signals, discrete Fourier transform and frequency resolution.


## Advanced Electronics and Sampling Theory

*Undergraduate, 2nd year · Semester 3 · Module Électronique S3 · 3 chapters, 6 tutorials, 3 four-hour bench labs*
<!-- 
The front end of a measurement chain, from the sensor to the digital value: amplifying a small differential signal without its common-mode noise, sampling and holding it, and converting it between analog and digital. Tutorials size a complete chain (resistive force sensor in a bridge, followed by an instrumentation amplifier); bench labs measure the CMRR of a TL081 differential stage against an INA121, observe aliasing with an LF398 sample-and-hold and a spectrum analyzer, and characterize a DAC08 converter alongside a PSpice simulation of a successive-approximation ADC. -->

**Topics:** common and differential modes, CMRR · differential amplifier and three-op-amp instrumentation amplifier · ideal, natural and real sampling, Shannon theorem and aliasing · sample-and-hold, zero-order hold and smoothing filter · truncation, weighting windows and spectral leakage · quantization, flash ADC, weighted-resistor DAC.


## Introduction to Probability and Statistics

*Undergraduate, 2nd year · Semester 4 · Module OML4 · 5 chapters, 5 tutorials, 5 Python labs*

<!-- From describing data to estimating a quantity with a stated confidence. Python labs move from first steps with NumPy and pandas to real problems: fitting a Poisson law to goals scored in a football season, estimating π by Monte Carlo to see the law of large numbers and the central limit theorem at work, testing pseudo-random generators, and estimating a DC voltage from noisy oscilloscope readings with occasional faulty samples, where maximum likelihood beats the naive average. -->

**Topics:** descriptive statistics, histograms and box plots · probability, random variables, expectation and variance · binomial, Poisson, exponential and normal laws · law of large numbers and central limit theorem · estimators, bias–variance decomposition · confidence intervals. 
