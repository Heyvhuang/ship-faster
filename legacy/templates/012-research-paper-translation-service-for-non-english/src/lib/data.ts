export interface Paper {
  id: string;
  title: string;
  titleZh: string;
  authors: string[];
  abstract: string;
  abstractZh: string;
  area: string;
  date: string;
  trending: number;
  source: string;
  status: "translated" | "in_progress" | "queued";
}

export const papers: Paper[] = [
  {
    id: "paper-001",
    title: "Scaling Laws for Sparse Mixture-of-Experts in Large Language Models",
    titleZh: "大型语言模型中稀疏混合专家的缩放定律",
    authors: ["Y. Chen", "A. Patel", "M. Rodriguez", "K. Tanaka"],
    abstract:
      "We investigate scaling laws governing sparse Mixture-of-Experts (MoE) architectures in large language models. Through systematic experiments across model sizes from 1B to 200B parameters, we derive precise mathematical relationships between expert count, routing strategy, and downstream task performance. Our findings reveal a power-law relationship between the number of active experts and compute efficiency, with diminishing returns beyond 16 active experts per token.",
    abstractZh:
      "我们研究了大型语言模型中稀疏混合专家（MoE）架构的缩放定律。通过对1B到200B参数规模模型的系统性实验，我们推导出专家数量、路由策略与下游任务性能之间的精确数学关系。我们的发现揭示了活跃专家数量与计算效率之间的幂律关系，当每个token的活跃专家数超过16时，收益递减。",
    area: "Large Language Models",
    date: "2026-02-15",
    trending: 1,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-002",
    title: "Visual Reasoning with Chain-of-Thought Prompting in Multimodal Foundation Models",
    titleZh: "多模态基础模型中的视觉推理与思维链提示",
    authors: ["L. Wang", "S. Kumar", "J. Fischer"],
    abstract:
      "We present a novel framework for enhancing visual reasoning capabilities in multimodal foundation models through structured chain-of-thought prompting. Our approach decomposes complex visual questions into sequential reasoning steps, achieving state-of-the-art results on VQA-v2, GQA, and our newly proposed VisualLogic benchmark.",
    abstractZh:
      "我们提出了一种通过结构化思维链提示增强多模态基础模型视觉推理能力的新框架。我们的方法将复杂的视觉问题分解为连续的推理步骤，在VQA-v2、GQA以及我们新提出的VisualLogic基准测试上取得了最先进的结果。",
    area: "Multimodal AI",
    date: "2026-02-12",
    trending: 2,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-003",
    title: "Efficient Fine-tuning of Diffusion Models via Low-Rank Spectral Adaptation",
    titleZh: "通过低秩谱适应实现扩散模型的高效微调",
    authors: ["R. Zhang", "H. Nakamura", "P. Dubois"],
    abstract:
      "We introduce Spectral LoRA (S-LoRA), a parameter-efficient fine-tuning method for diffusion models that operates in the spectral domain. By decomposing weight updates using singular value decomposition and adapting only the top-k spectral components, S-LoRA achieves comparable quality to full fine-tuning with only 0.3% trainable parameters.",
    abstractZh:
      "我们引入了谱LoRA（S-LoRA），一种在谱域中运行的扩散模型参数高效微调方法。通过使用奇异值分解来分解权重更新，并仅适应前k个谱分量，S-LoRA在仅使用0.3%可训练参数的情况下，达到了与全量微调相当的质量。",
    area: "Generative AI",
    date: "2026-02-10",
    trending: 3,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-004",
    title: "Reward Shaping for Safe Reinforcement Learning in Autonomous Systems",
    titleZh: "自主系统中安全强化学习的奖励塑造",
    authors: ["M. Li", "A. Johnson", "T. Yamamoto"],
    abstract:
      "We propose a novel reward shaping framework that guarantees safety constraints in reinforcement learning for autonomous systems. Our method introduces learnable safety boundaries that adapt during training, significantly reducing constraint violations while maintaining competitive task performance across robotics and autonomous driving benchmarks.",
    abstractZh:
      "我们提出了一种新颖的奖励塑造框架，保证自主系统强化学习中的安全约束。我们的方法引入了在训练过程中自适应的可学习安全边界，在机器人和自动驾驶基准测试中显著减少了约束违规，同时保持了具有竞争力的任务性能。",
    area: "Reinforcement Learning",
    date: "2026-02-08",
    trending: 4,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-005",
    title: "Token-Free Language Modeling with Byte-Level Transformers",
    titleZh: "基于字节级Transformer的无分词语言建模",
    authors: ["X. Liu", "K. Park", "D. Santos"],
    abstract:
      "We present ByteFormer, a transformer architecture that operates directly on raw bytes without tokenization. By introducing hierarchical byte grouping and local-global attention patterns, ByteFormer achieves competitive perplexity with tokenized models while eliminating vocabulary limitations and enabling true multilingual capability without language-specific preprocessing.",
    abstractZh:
      "我们提出了ByteFormer，一种直接在原始字节上操作而无需分词的Transformer架构。通过引入层次化字节分组和局部-全局注意力模式，ByteFormer在消除词表限制的同时，达到了与分词模型相当的困惑度，实现了真正的多语言能力而无需语言特定的预处理。",
    area: "Large Language Models",
    date: "2026-02-05",
    trending: 5,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-006",
    title: "Self-Supervised Learning of 3D Scene Understanding from Video",
    titleZh: "从视频中自监督学习三维场景理解",
    authors: ["W. Zhao", "C. Anderson", "N. Petrov"],
    abstract:
      "We propose Video3D, a self-supervised framework for learning 3D scene representations from unlabeled video sequences. Our method leverages temporal consistency and multi-view geometry to learn dense 3D features without any 3D supervision, achieving strong performance on depth estimation, novel view synthesis, and 3D object detection.",
    abstractZh:
      "我们提出了Video3D，一种从无标签视频序列中学习三维场景表示的自监督框架。我们的方法利用时间一致性和多视图几何来学习密集的三维特征，无需任何三维监督，在深度估计、新视角合成和三维目标检测上取得了优异的性能。",
    area: "Computer Vision",
    date: "2026-02-03",
    trending: 6,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-007",
    title: "Constitutional AI: Training Helpful and Harmless Assistants Without Human Feedback",
    titleZh: "宪法AI：无需人类反馈训练有用且无害的助手",
    authors: ["J. Wei", "F. Mueller", "R. Gupta"],
    abstract:
      "We extend the Constitutional AI framework with a self-improving critique mechanism that eliminates the need for human preference data. Our approach uses a hierarchy of AI-generated principles to iteratively refine model outputs, achieving comparable alignment scores to RLHF while reducing annotation costs by 95%.",
    abstractZh:
      "我们通过自改进批评机制扩展了宪法AI框架，消除了对人类偏好数据的需求。我们的方法使用AI生成的层次化原则来迭代改进模型输出，在将标注成本降低95%的同时，达到了与RLHF相当的对齐分数。",
    area: "AI Safety",
    date: "2026-02-01",
    trending: 7,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-008",
    title: "Graph Neural Networks for Protein-Ligand Binding Affinity Prediction",
    titleZh: "用于蛋白质-配体结合亲和力预测的图神经网络",
    authors: ["H. Kim", "O. Martinez", "Y. Tanaka"],
    abstract:
      "We introduce BindGNN, a graph neural network architecture specifically designed for predicting protein-ligand binding affinities. By incorporating 3D geometric information and physics-informed message passing, BindGNN achieves state-of-the-art correlation with experimental binding data on PDBbind and CASF benchmarks.",
    abstractZh:
      "我们引入了BindGNN，一种专门用于预测蛋白质-配体结合亲和力的图神经网络架构。通过融入三维几何信息和物理启发的消息传递，BindGNN在PDBbind和CASF基准测试上与实验结合数据达到了最先进的相关性。",
    area: "AI for Science",
    date: "2026-01-28",
    trending: 8,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-009",
    title: "Federated Learning with Differential Privacy for Medical Image Analysis",
    titleZh: "用于医学图像分析的差分隐私联邦学习",
    authors: ["S. Huang", "B. Thompson", "A. Volkov"],
    abstract:
      "We present FedMedDP, a federated learning framework with formal differential privacy guarantees for collaborative medical image analysis. Our novel noise calibration strategy maintains diagnostic accuracy within 2% of centralized training while providing (ε=1.0, δ=10⁻⁵)-differential privacy across participating hospital networks.",
    abstractZh:
      "我们提出了FedMedDP，一种具有正式差分隐私保证的联邦学习框架，用于协作式医学图像分析。我们新颖的噪声校准策略在保持诊断准确率与集中式训练相差不超过2%的同时，在参与的医院网络中提供了(ε=1.0, δ=10⁻⁵)差分隐私保护。",
    area: "AI for Science",
    date: "2026-01-25",
    trending: 9,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-010",
    title: "Attention-Free Transformers: Replacing Self-Attention with State Space Models",
    titleZh: "无注意力Transformer：用状态空间模型替代自注意力",
    authors: ["Z. Gu", "L. Park", "E. Rossi"],
    abstract:
      "We demonstrate that state space models (SSMs) can fully replace self-attention in transformer architectures for language modeling. Our hybrid SSM-MLP architecture achieves equivalent perplexity to standard transformers while reducing inference latency by 3.2x for sequences longer than 8K tokens, enabling efficient processing of long documents.",
    abstractZh:
      "我们证明了状态空间模型（SSM）可以在语言建模的Transformer架构中完全替代自注意力。我们的混合SSM-MLP架构在达到与标准Transformer相当的困惑度的同时，对于长度超过8K token的序列将推理延迟降低了3.2倍，实现了长文档的高效处理。",
    area: "Large Language Models",
    date: "2026-01-22",
    trending: 10,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-011",
    title: "Neural Architecture Search for Edge Deployment via Hardware-Aware Optimization",
    titleZh: "通过硬件感知优化实现边缘部署的神经架构搜索",
    authors: ["P. Chen", "G. Ivanov", "M. Okafor"],
    abstract:
      "We propose EdgeNAS, a hardware-aware neural architecture search framework that co-optimizes model accuracy and inference efficiency for edge devices. By incorporating device-specific latency predictors into the search objective, EdgeNAS discovers architectures that achieve 2.1x speedup on mobile GPUs with less than 1% accuracy drop.",
    abstractZh:
      "我们提出了EdgeNAS，一种硬件感知的神经架构搜索框架，它协同优化模型精度和边缘设备的推理效率。通过将设备特定的延迟预测器纳入搜索目标，EdgeNAS发现的架构在移动GPU上实现了2.1倍加速，精度下降不到1%。",
    area: "MLOps",
    date: "2026-01-20",
    trending: 11,
    source: "Hugging Face",
    status: "translated",
  },
  {
    id: "paper-012",
    title: "Zero-Shot Cross-Lingual Transfer for Low-Resource Named Entity Recognition",
    titleZh: "面向低资源命名实体识别的零样本跨语言迁移",
    authors: ["T. Nguyen", "I. Sato", "C. Rivera"],
    abstract:
      "We present XLingual-NER, a zero-shot cross-lingual transfer method for named entity recognition in low-resource languages. By aligning multilingual representations through contrastive learning on parallel corpora, our method achieves strong NER performance in 40+ languages using only English training data.",
    abstractZh:
      "我们提出了XLingual-NER，一种面向低资源语言命名实体识别的零样本跨语言迁移方法。通过在平行语料库上的对比学习来对齐多语言表示，我们的方法仅使用英语训练数据就在40多种语言上取得了优异的NER性能。",
    area: "Natural Language Processing",
    date: "2026-01-18",
    trending: 12,
    source: "Hugging Face",
    status: "translated",
  },
];

export const areas = [
  "All Areas",
  "Large Language Models",
  "Multimodal AI",
  "Computer Vision",
  "Generative AI",
  "Reinforcement Learning",
  "AI Safety",
  "AI for Science",
  "Natural Language Processing",
  "MLOps",
];
