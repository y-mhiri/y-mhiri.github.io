---
title: Quantification for radio-astronomy imaging
type: internship
status: open
location: Annecy and Rennes, France
laboratory: LISTIC (Annecy) / IETR (Rennes)
duration: 4 to 6 months
start: February 2027
contact: Yassine Mhiri, Mickaël Dardaillon
contact_url: mailto:yassine.mhiri@univ-smb.fr,mickael.dardaillon@insa-rennes.fr
summary: >-
  Master 2 internship exploring the energy and latency benefits of
  quantification in radio astronomy imaging, funded by the ECLAT laboratory.
---

Recruit a Master 2 student in electronics or computer science. The aim of this internship is to explore the potential energy and latency benefits of quantification in radio astronomy imaging.

**Keywords:** quantification, radio astronomy, high-performance computing, energy, optimization

## Context

Radio-interferometers image the sky in the radio domain from the measurements of an array of antennas. The Square Kilometre Array (SKA) involves a large number of antennas and plans to greatly improve the resolution of the reconstructed images. Regarding the data processing pipelines, this new instrument will lead to a data deluge with data rates of multiple terabits per second. To scale to the full potential of the instrument and match sustainability objectives, a set of constraints should be taken into account:

- storage: no data storage, real-time processing
- compute: limited energy for cost and environmental reasons

In fact, the data size represents one of the main bottlenecks in the imaging pipeline. Computing the dirty image and convolving the PSF with a model image are among the main bottlenecks in imaging pipelines. Existing work in data compression [1] and energy reduction [2] shows that reduced precision can be implemented for those steps. Furthermore, reducing the data size and complexity of those steps can make the implementation of more complex optimization algorithms scalable. However, in more complex imaging pipelines, the reduction in precision can lead to non-negligible artifacts [3, 4].

This collaborative project between LISTIC in Annecy and IETR in Rennes proposes to look directly at the size of the data transferred and computed, using quantification. To do so, various quantification strategies to reduce the memory footprint in imaging pipelines, and their implementation in imaging algorithms, will be explored.

First results show that low-precision floating-point is able to perform as well as double precision in terms of signal quality for simple radio-astronomy sky models and imaging pipelines. These results motivate the exploration of more complex sky models and real data, as well as more complex imaging pipelines.

## Objectives

The internship will explore the influence of quantification on different radio astronomy imaging algorithms:

- Evaluate algorithms with more complex sky models and real data.
- Implement modern imaging pipelines, evaluating them with mixed precision in terms of signal quality, and developing new energy cost models.
- Quantify the influence of mixed precision on the convergence of optimization-based imaging algorithms [4].

The overall objective is to explore the Pareto frontier, looking for new trade-offs between energy, accuracy, memory and latency.

## Skills

**Essential**

- Development in Python
- Integration with bash, git

**Desirable**

- Development in a high-performance computing environment
- Signal and image processing, radio astronomy algorithms

## Characteristics

- **Duration:** 4 to 6 months
- **Start:** February 2027
- **Stipend:** 669,90 € / month
- **Funded by:** [Laboratoire ECLAT](https://eclat-lab.fr/)

## Location

The project will take place between Annecy (LISTIC) and Rennes (IETR), with mobility between the laboratories as well as possible collaborations within the ECLAT laboratory.

## Supervisors

- [Yassine Mhiri](https://y-mhiri.github.io/), LISTIC, Annecy
- [Mickaël Dardaillon](https://dardarel.github.io/), IETR, Rennes

## Applications

Send a resume and application letter to [yassine.mhiri@univ-smb.fr](mailto:yassine.mhiri@univ-smb.fr) and [mickael.dardaillon@insa-rennes.fr](mailto:mickael.dardaillon@insa-rennes.fr).

## References

1. A. R. Offringa, *Compression of interferometric radio-astronomical data*. [[arXiv:1609.02019]](https://arxiv.org/abs/1609.02019)
2. S. Corda, *Reduced-Precision Acceleration of Radio-Astronomical Imaging on Reconfigurable Hardware*. [[IEEE]](https://ieeexplore.ieee.org/document/9709826)
3. *A Study on Convolution Operator Using Half Precision Floating Point Numbers on GPU for Radioastronomy Deconvolution*. [[HAL]](https://hal.science/hal-01837982v1)
4. H. L. Bester et al., *Africanus III. pfb-imaging — a flexible radio interferometric imaging suite*. [[arXiv:2412.10073]](https://arxiv.org/abs/2412.10073)
