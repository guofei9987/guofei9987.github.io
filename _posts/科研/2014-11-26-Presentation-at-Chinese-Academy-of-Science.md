---
layout: post
title: 我的报告 Decentralized Privacy-Preserving Low-Rank Matrix Completion
category: 科研
tags: Math Optimization
keywords: 报告总结
description: 
---


![1](/public/img/posts/s1.png)



###我的报告

####Section 0: Introduce Myself
Page 1

- Good afternoon everyone! My name is Anya Lin. I'm a second-year master candidate from University of Science and Technology of China. It's my great pleasure to introduce to you the Decentralized Privacy-Preserving Low-Rank Matrix Completion. It's a joint work with my supervisor, Prof. Ling from USTC.
- Before I start, I want to express my thanks to Prof. Ling for his patient instructions and help over the last a few months.

Page 2

- Here's the outline of my presentation.
- First is the introduction.
- And then the centralized matrix completion problem.
- We develop a decentralized algorithm in section 3, and our algorithm is derived from a centralized algorithm as I will talk about in section 2.
- Next, I will introduce the main result of the topology-dependent privacy preservation.
- At last, it's the conclusion.

####Section 1: Introduction
Page 3

- OK， let's go into the introduction.

Page 4

- I'd like to begin with the concept of matrix completion. So what is matrix completion? As we can see in this picture, we have an incomplete matrix, whose entries are known only for a subset of the whole matrix. And the rank of the matrix is very small compared with the size of the matrix.
- The goal of the matrix completion is to recover all these unknown entries of of the matrix, as the right-side picture shows. Here, Z is the recovery of W.

Page 5

- There's many applications of such a problem. Like image processing, recommendation system and so on. Here are 2 examples. The first one is a problem of image processing. The left picture has a lot of noises, or say, only a part of the original picture is known. By using the fact that the original picture is usually low-rank, we can matrix completion to denoise the picture and get a clear version of high quality as the right picture shows.
- The second example is more close to our lives. It's related to a recommendation system. As you can see, it's a webpage of Douban Movie. A user sees a movie, such as Interstella, and then scores it on the website. Here we can imagine a huge matrix with rows representing users and columns the movies. This matrix is incomplete and it's low-rank. Once this matrix is completed, the website can recommend new movies to users.

Page 6

- Now, here comes a privacy concern. First what is privacy? Privacy is the values one considers private. In the example we mentioned just now, the users' scores of the movies are privacy, because one may not want others to know what movies he has seen or likes. Also, the entries of the matrix could be medical records of patients, or selling data of merchants. These data are considered as privacy.
- Obviously, no one wants the leakage of his privacy.
- However, in reality there may exist a malicious agent, a bad guy. For some reasons you have to give your private data to it, but you don't know wether you can trust it or not.
- In this situation, we need privacy-preservation. Privacy-preservation is the ability to prevent a malicious agent from obtaining or reconstructing the private data.

####Section 2: Centralized Matrix Completion Problem
Page 7

- Now let's go into the centralized matrix completion problem.

Page 8

- When we are faced with a low-rank matrix completion problem, the intuitive thought would be to minimize the rank of the matrix, but this is a nonconvex problem. 
- Therefore, we insteadly minimize the nuclear-norm the the matrix, since nuclear-norm is the approximation of the rank and it's convex.
- Another approach is if the rank of matrix is known to be r as a prior theoreticallyor empirically, we can get the matrix factorization formulation. This approach is advantageous over the nuclear-norm approach since the latter one needs sigular value decomposition, which is computationally expensive and even intractable in decentralized computing.
- A centralized algorithm called LMaFit to solve this is as the following steps shows.
- We have to keep in mind that our algorithm is derived from LMaFit.

####Section 3: Decentralized Matrix Completion Problem
Page 9

- After the centralized problem, let's go into the decentralized one.

Page 10

- In decentralized computing, we have a network composed of L agents.
- There is an undirected edge between two agents if they can communicate with each other through one hop.
- The goal of all the agents in such a network is to collaboratively complete a low-rank matrix in a decentralized fashion.

Page 11

- To be specific, we segment the whole data matrix W into groups of columns. And do the same to Y and Z. Each agent i in the network holds the corresponding Zi, Yi and entries of Wi. 
- However, X cannot be segmented and distributed to agents because the update of X contains the summation of ZiYi' over all agents. So we let each agent i holds a local copy X(i) of X.
- After doing this, we get a naive decentralized implementation of LMaFit. At iteration k, each agent i does the following steps respectively.
- Notice that the update of X requires information aggregation of all agents. So here is the challenge: informationaggregationofallagentsisimpossible in real decentralized network unless every agent is connected to all the other agents. 
- How to deal with this challenge?

Page 12

- The answer is dynamic average consensus. Recall that each agent i holds a local copy X(i) of X. If we can make sure that X(i) equals to X for all i, the challenge is solved. 
- To do this, we choose c to be 1/L and the update of X becomes the average consensus problem, as we can see in equation (8), X(i) is the average of all the ZiYi'.
- At iteration k,we formulate the average consensus problem as equation (9). The constraint means that instead of letting all the X(i) to be identical we choose to let each X(i) equals to it neighboring X(j).
- A key observation is that exact average consensus at every iteration is not necessary. We use EXTRA to do inexact dynamic average consensus, which saves the computational cost.

Page 13

- Our decentralized algorithm called D-LMaFit is developed as below.
- Step 1 is the initialization.
- Step 2, use EXTRA to do the inexact average consensus problem.
- Step 3, update Y and X respectively. 

Page 14

- The performance of D-LMaFit is shown in these two pictures. (Explain what these pictures indicate to the audience)

####Section 4: Topology-Dependent Privacy Preservation
Page 15

- Now let's go into the section of the topology-dependent privacy preservation.

Page 16

- First compare decentralized algorithm with centralized one.
- Centralized algorithm needs a fusion center to collect global data. What if the fusion center is a malicious agent?
- Oops TT, you'll lose all your privacy.
- How about the decentralzied algorithm? One important advantage of decentralized algortihm over a centralized is there's no global data collection, each agent observes part of the raw data and communicates with its neighboring agent(s). It seems safer.
- But things aren't so lucky in reality. Because the communication of X(i) among the network may lead to information leakage.

Page 17

- How does this happen? Suppose in a network as this picture shows, we have a malicious agent M, and M attempts to recover the local data matrices of some other agents through information exchange.
- M is interested in recovering the local data Wi, or equivalently Yi or Zi of a set of agents i∈I.
- When the iteration k is large enough, X(i) will be identical. So if a malicious agent M somehow knows other agents' Yi, it can recover the data Zi of agent i by doing X(M)Yi.
- So our concern is, is there any possibility that the malicious agent M can somehow obtain Yi of agent i, and thus get Zi, which is private.

Page 18

- Before going to details, consider two simple topologies.
- (Explain the two topologies)
- Under what conditions can not a malicious agent M reconstruct the sensitive information of P and Q ?

Page 19

- Recall the update of X.
- If you could just take a look at the equation, you can find that if the topology is as in the left picture, M can reconstruct ZiYi' and it may be able to solve Yi so that gets the privacy of P and Q.
- But if the topology is as shown in the right picture. M cannot get the private data of P and Q. Why?
- (Explain with the equation)
- M can solve a series of linear inverse problems and calculate the values of ZiYi', as what we have said just now.

Page 20

- Now we get a naive conclusion.

Page 21

- So the privacy-preserving problem boils down to the linear inverse problem. First we define some variables as this.
- And further we define A and B.
- Using these definition,the update of X can be represented by (14).

Page 22

- Rewrite this as a linear time-invariant systems we get (15). In this system, QI selects those row blocks in Q belonging to the agents in I, and BI selects the corresponding columns in B. QIC and BIC selects the other corresponding row blocks and columns which do not belong to the agents in I.
- Our analysis uses the concept of z-transfer matrix of (15). The concept is from modern control theory.
- Obviously, rank(T)=rank(TI TIC), since the latter matrix is just a column rearrangement of the former one. 
- Now we are ready to develop our theorem.

Page 23

- Check the proof of the suffienciency of our theorem, it's rather straightforward.
- If this condition is satisfired, then M has full knowledge of all the X(i).
- So M can solve a series of linear inverse problems.

Page 24

- The proof of necessity is a little bit complicated. Here's the only the simplified version of the proof.
-  First we show that to determine a unique sequence of Q􏰇 from V􏰇 , we must have (18).
- Suppose (18) doesn't hold, then there exists at least one column of TI that is linearly dependent on the other columns of T. Then there exists a Q with that column nonzero, and satisfies TQ=0. This corresponds to a nonzero input in I, but the output V is zero for all time. Thus this nonzero input cannot be recovered. This contradicts with the hypothesis. So (18) must hold.
- (Explain these items)

Page 25

- (Explain these items)

####Section 5: Conclusion
Page 26

- I'd like to quickly go over the main point of today's topic.

Page 27

- First, we propose a decentralized privacy-preserving algorithm, D-LMaFit, to solve the matrix completion problem.
- We solve dynamic average consensus subproblem inexactly.
- We prove the topology-dependent privacy-preserving theorem. It provides a guideline of designing a privacy-preserving network.

Page 28

- Still we've got work to do in the future. (Read items)

Page 29

- I guess that's it. Thank you all very much for listening. Now if you have any question, please feel free to ask me.


###故事
这学期我在中科院数学与系统科学研究院(AMSS)访问。第一次参与这边的讨论班时，我就被惊到了：学生做报告也全程英文，不愧是[袁亚湘](http://lsec.cc.ac.cn/~yyx/chinese/indexc.htm)老师的学生。于是，11月25日，我也在这儿完成了自己第一次的英文学术报告。

1. 报告前3天，我问盛镇醴师兄他们报告前会不会排练，师兄说：“肯定要啊！上次去葡萄牙开会，[马士谦](http://www.se.cuhk.edu.hk/people/sqma.html)师兄已经讲得那么好了，都还又自己私下练习了5、6遍。师兄真的可以做到每句话精确到几秒钟！”太荔枝了有木有TT。
2. 于是我也练习了。果然只有努力了内心才会踏实。在当天的报告中，我不仅不紧张，还在瞅到台下一堆人的专注神情时，心里突然弹幕全开：“哇，这感觉好爽。”

在记录报告之前，插播一段回忆：
大三暑假，我参加[中国大学生物联网创新创业大赛](http://china.ican-contest.org/index.html)，正式比赛前一天系里组织答辩练习，我们组讲得一塌糊涂。那一晚，我和向国菲师兄在实验室通宵改幻灯片，准备发言稿，然后一句一句地练习。中途师兄压力太大又累得不行溜出去躲着抽了根烟，回来被我发现了教育了一顿，嗅觉就是这么灵敏没办法。直到凌晨4点，终于觉得还算满意了，两人躺椅子上睡了会儿，当然我被蚊子咬安逸了。早晨7点，寝室开门，两人各自回去洗澡调整状态。9点，开始比赛。不知道为什么突然想起这个，太，美好了。尽管当时觉得真苦逼。



###资料
【1】[有哪些高级的英语表达技巧，让人一听就很地道？](http://www.zhihu.com/question/24544386/answer/30237316)



