---
language:
- en
license: apache-2.0
pretty_name: WebTestBench
tags:
- agent
configs:
- config_name: default
  data_files:
  - split: test
    path: WebTestBench.json
size_categories:
- n<1K
---


## WebTestBench: Evaluating Computer-Use Agents towards End-to-End Automated Web Testing

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![arXiv](https://img.shields.io/badge/arXiv-2603.25226-b31b1b.svg)](https://arxiv.org/abs/2603.25226)
[![GitHub](https://img.shields.io/badge/GitHub-WebTestBench-4b32c3?logo=github)](https://github.com/friedrichor/WebTestBench)

## 📖 Overall

The rise of "vibe coding" enables developers to rapidly build complete web applications through natural language instructions, but this introduces a critical question: how do we automatically verify that AI-generated web functionalities are correctly implemented?

**WebTestBench** is a benchmark designed for evaluating computer-use agents on end-to-end automated web testing. It grounds evaluation in realistic AI-driven web development scenarios and goes beyond standard functional checks to assess latent logical constraints — nuanced behavioral rules such as permission boundaries and business logic that are often invisible in the interface but critical to software quality.

Key features include:
- Web applications spanning 7 diverse application categories
- Evaluation dimensions: Functionality, Constraint, Interaction, and Content
- WebTester, a two-stage baseline framework consisting of:
  - Checklist Generation Agent — automatically generates a structured test checklist from the development instruction
  - Defect Detection Agent — interacts with the application to detect defects against the checklist

## 🔍 Dataset

**Example**

<p align="center">
    <img src="https://raw.githubusercontent.com/friedrichor/WebTestBench/main/assets/data_example.png" width="80%">
</p>

All web projects can be deployed via:
```bash
npm install
npm run dev
```
You may use this to preview the applications manually, but no pre-deployment is needed before evaluation. Automatic deployment and teardown are handled within the evaluation code.

## 📋 Citation

If you find our work helpful, feel free to give us a cite.

```
@article{kong2026webtestbench,
  title={WebTestBench: Evaluating Computer-Use Agents towards End-to-End Automated Web Testing},
  author={Kong, Fanheng and Zhang, Jingyuan and Yue, Yang and Sun, Chenxi and Tian, Yang and Feng, Shi and Yang, Xiaocui and Wang, Daling and Tian, Yu and Du, Jun and Zeng, Wenchong and Li, Han and Gai, Kun},
  journal={arXiv preprint arXiv:2603.25226},
  year={2026}
}
```