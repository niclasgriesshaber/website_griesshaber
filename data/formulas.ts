export const formulas = [
  // Deep Learning Core Concepts
  "\\begin{align*} h &= \\text{ReLU}(Wx + b) \\end{align*}",
  "\\begin{align*} \\sigma(x) &= \\frac{1}{1 + e^{-x}} \\end{align*}",
  "\\begin{align*} \\text{softmax}(x_i) &= \\frac{e^{x_i}}{\\sum_{j=1}^n e^{x_j}} \\end{align*}",
  "\\begin{align*} \\text{GELU}(x) &= x\\Phi(x) \\end{align*}",
  
  // Loss Functions
  "\\begin{align*} \\mathcal{L}_{\\text{MSE}} &= \\frac{1}{n}\\sum_{i=1}^n(y_i - \\hat{y}_i)^2 \\end{align*}",
  "\\begin{align*} \\mathcal{L}_{\\text{BCE}} &= -\\frac{1}{N}\\sum_{i=1}^N \\big[ y_i\\log(\\hat{y}_i) \\\\ &\\quad + (1-y_i)\\log(1-\\hat{y}_i) \\big] \\end{align*}",
  "\\begin{align*} \\mathcal{L}_{\\text{CE}} &= -\\sum_{i=1}^C y_i\\log(\\hat{y}_i) \\end{align*}",
  
  // Optimization
  "\\begin{align*} w_{t+1} &= w_t - \\eta \\nabla_{w_t} \\mathcal{L} \\end{align*}",
  "\\begin{align*} m_t &= \\beta_1 m_{t-1} + (1-\\beta_1)\\nabla_{w_t} \\mathcal{L} \\end{align*}",
  "\\begin{align*} v_t &= \\beta_2 v_{t-1} + (1-\\beta_2)(\\nabla_{w_t} \\mathcal{L})^2 \\end{align*}",
  "\\begin{align*} w_{t+1} &= w_t - \\eta \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} \\end{align*}",
  
  // Attention Mechanism
  "\\begin{align*} \\text{Attention}(Q,K,V) &= \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V \\end{align*}",
  
  // Transformers
  "\\begin{align*} \\text{LayerNorm}(x) &= \\gamma \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta \\end{align*}",
  "\\begin{align*} \\text{FFN}(x) &= \\max(0, xW_1 + b_1)W_2 + b_2 \\end{align*}",
  
  // Regularization
  "\\begin{align*} \\mathcal{L}_{\\text{reg}} &= \\mathcal{L} + \\lambda \\sum_{w} \\|w\\|^2 \\end{align*}",
  "\\begin{align*} \\text{Dropout}(x) &= \\frac{\\text{mask}\\odot x}{1-p} \\end{align*}",
  
  // CNN
  "\\begin{align*} \\text{Conv2D}(I,K)_{xy} &= \\sum_{i,j} I_{x+i,y+j}K_{ij} \\end{align*}",
  "\\begin{align*} \\text{MaxPool}(X)_{ij} &= \\max_{(a,b)\\in R_{ij}} x_{ab} \\end{align*}",
  
  // RNN & LSTM
  "\\begin{align*} h_t &= \\tanh(W_{xh}x_t + W_{hh}h_{t-1} + b) \\end{align*}",
  "\\begin{align*} f_t &= \\sigma(W_f[h_{t-1}, x_t] + b_f) \\end{align*}",
  "\\begin{align*} i_t &= \\sigma(W_i[h_{t-1}, x_t] + b_i) \\end{align*}",
  
  // VAE & GAN
  "\\begin{align*} \\text{ELBO} &= \\mathbb{E}_{q(z|x)}[\\log p(x|z)] \\\\ &\\quad - D_{KL}(q(z|x)\\,\\|\\,p(z)) \\end{align*}",
  "\\begin{align*} \\min_G \\max_D &\\mathbb{E}_{x\\sim p_{\\text{data}}}[\\log D(x)] \\\\ &+ \\mathbb{E}_{z\\sim p_z}[\\log(1-D(G(z)))] \\end{align*}",
  
  // Information Theory
  "\\begin{align*} H(X) &= -\\sum_{x\\in \\mathcal{X}} p(x)\\log p(x) \\end{align*}",
  "\\begin{align*} I(X;Y) &= \\sum_{x,y} p(x,y)\\log\\frac{p(x,y)}{p(x)p(y)} \\end{align*}",
  "\\begin{align*} D_{KL}(P\\,\\|\\,Q) &= \\sum_{x} P(x)\\log\\frac{P(x)}{Q(x)} \\end{align*}",
  
  // Reinforcement Learning
  "\\begin{align*} A(s,a) &= Q(s,a) - V(s) \\end{align*}",
  "\\begin{align*} \\pi_{\\theta}(a|s) &= \\frac{\\exp(f_{\\theta}(s,a))}{\\sum_{a'}\\exp(f_{\\theta}(s,a'))} \\end{align*}",
  
  // Probabilistic ML
  "\\begin{align*} p(\\theta|D) &= \\frac{p(D|\\theta)p(\\theta)}{p(D)} \\end{align*}",
  "\\begin{align*} \\theta_{\\text{MAP}} &= \\arg\\max_{\\theta} \\big[ \\log p(D|\\theta) \\\\ &\\quad + \\log p(\\theta) \\big] \\end{align*}",
  "\\begin{align*} \\mathbb{E}_{x\\sim p(x)}[f(x)] &\\approx \\frac{1}{N}\\sum_{i=1}^N f(x_i) \\end{align*}",
]; 