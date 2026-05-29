---
permalink: /
title: "Internship in Quantification for Radio-Astronomy"
excerpt: "Internship in Quantification for Radio-Astronomy"
author_profile: true
redirect_from: 
  - /stages/stages-quantification
---

# Internship in Quantification for Radio-Astronomy


Recruit a Master 1 or Master 2 student in electronics or computer science. The aim of this internship is to explore the potential energy and latency benefits of quantification in radio astronomy imaging.

Keywords: quantification, radio astronomy, high-performance computing, energy, optimization

## Context

Radio-interferometers image the sky in radio domain from the measurement of an array of antennas. The Square Kilometer Array (SKA) involves a large number of antennas and plans to greatly improve the resolution of the reconstructed images. Regarding the data processing pipelines, this new instrument will lead to a data deluge with data rates of multiple Terabits per seconds. To scale with the full potential of the instruments and to match sustainability objectives, a set of constraints should be taken into account :
- storage: no data storage, real-time processing
- compute: limited energy for cost and environmental reasons

In fact, the data size represent one the main botlleneck in the imaging pipeline. Computing the dirty image and convolving the PSF with a model image represent ones of the mains bottleneck in imaging pipelines. Existing work in data compression[^Offringa] and energy reduction[^Corda] show that reduced precisions can be implemented for those steps. Furthermore, reducing the data size and complexity of those steps can make the implementation of more complex optimization algorithm scalable. However, in more complex imaging pipeline, the reduction in precision can lead to non-negligeable artifacts [^Seznec][^Bester].

This collaborative project between LISTIC in Annecy and IETR in Rennes propose to look directly at the size of the data transfered and computed, using quantification. To do so, various quantification strategies to reduce the memory footprint in imaging pipeline and their implementations in imaging algorithms will be explored.

## Objectives

The internship will explore the quantification influence on different radio astronomy imaging algorithms:
- Evaluate algorithms with different quantification format and sizes, including floating-point, block floating-point, fixed-point.
- Implement different algorithms for the forward and backward radio-interferometric measurement operator in mixed precision (gridding and FFT [^Arras], NUFFT [^Greengard], Grid-to-Grid [^Monnier]).
- Quantify the influence of mixed precisions on the convergence of optimization based imaging algorithms [^Bester]. 

The overall objective is to explore the pareto frontier, looking for new tradeoffs in energy, accuracy, memory and latency.

## Skills

Essential
- Developpement in Python
- Integration with bash, git

Desirable
- Development in High-Performance Computing environment
- Signal, image processing, radio astronomy algorithms

## Characteristics

- Duration: 2 to 3 months
- Start: June-July 2026
- Stipend: 669,90€ / month
- Funded by: [Laboratoire ECLAT](https://eclat-lab.fr/)

<!-- ## Funding

Request total of: 7000€
- intern stipend: 4000€
- Week mobility to visit partner lab for 2 persons: 2000€
- Participation to Hackathon: 1000€ -->

## Location

The project will take place in Annecy (LISTIC) or Rennes (IETR), with mobilities between laboratories as well as a 1 week hackathon planned in Nice in June with ECLAT.

## Supervisors

- [Yassine Mhiri, LISTIC, Annecy](https://y-mhiri.github.io/)
- [Mickaël Dardaillon, IETR, Rennes](https://dardarel.github.io/)

## Applications

Send resume and application letter to yassine.mhiri@univ-smb.fr, mickael.dardaillon@insa-rennes.fr

## References

[^Offringa]: [Compression of interferometric radio-astronomical data, A. R. Offringa](https://arxiv.org/abs/1609.02019)
[^Corda]: [Reduced-Precision Acceleration of Radio-Astronomical Imaging on Reconfigurable Hardware, S. Corda](https://ieeexplore.ieee.org/document/9709826)
[^Seznec]: [A Study on Convolution Operator Using Half Precision Floating Point Numbers on GPU for Radioastronomy Deconvolution](https://hal.science/hal-01837982v1)
[^Monnier]: [Fast Sky to Sky Interpolation for Radio Interferometric
Imaging](https://hal.science/hal-03725824v1/file/ICIP___Paper.pdf)
[^Arras]: [Efficient wide-field radio interferometry response](https://www.aanda.org/articles/aa/pdf/2021/02/aa39723-20.pdf)
[^Greengard]: [Accelerating the Nonuniform Fast Fourier Transform∗](https://epubs.siam.org/doi/abs/10.1137/S003614450343200X)
[^Bester]: [Africanus III. pfb-imaging - a flexible radio interferometric imaging suite](https://arxiv.org/pdf/2412.10073)