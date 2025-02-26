# Chapter 1

# Power Flow Analysis

## Introduction
Some introduction 

## Power Flow Fundamentals 
% Some fundamentals for Power Flow and optimal power flow

Power flow analysis is a method for studying characteristics of a powersystem e.g. to estimate the voltage leves, current flows, loading (and overloading) of components in the powersystem and, as the name indicates, how the power flows in the system. 

It is a study of steady state of a power system and may be used for further analysis with different load scenarios, changes in power flow in case of outage of components etc. 

It is essential a calculation of the neccessary output variables, given a set of input variables to satisfy Kirchhoff's Current Law.
The main variables investigated are: 
- voltage magnitude (V)
- voltage angle (/tetha)
- Active power(P)
- Reactive power(Q)

For power flow studies these variables can be investigated by defining a network of nodes and lines, where each node are equivalent of a busbar that can have both power generation and loads connected to it.
The nodes may be primary generation nodes or primary load nodes, but nodes may have both generation and load connected.
Generation loads are normally PV nodes (Active power(P) and voltages(V) are fixed), while load nodes are PQ nodes (Active power (P) and reactive power (Q) are fixed).
A system also needs a "Slack" node which, as the name indicates, picks up the slack. This node has a fixed voltage angle (equal to 0) and an absolute voltage value that is the reference for other nodes. 
It is also common to use a Per Unit value, denoted PU, for other nodes which is a factor related to the base voltage of the slack node.

To further investigate this, some basic definitions and dependencies must be defined:

Voltages:
The voltages in a line can be calculated as described in [Equation 1](#1) 

$$ \overline{V_2} = \overline{V_1}- \frac{RP+XQ}{V} -j\frac{XP+RQ}{V}  \tag{1} $$

where R and X are the resistance and reactance of the line, and P and Q are the active and reactive power. (see page 164, eq 8.3)
or simpler:
$$ \overline{V_2} = \overline{V_1}- \Delta V_{Re} -j\Delta V_{Im} {{numeq}} $$
As the reactance is normally orders of magnitude larger than resistance, this can be rewritten as the approximation:
$$ \Delta V_{Re} \approx \frac{XQ}{V_1} {{numeq}}$$
$$ \Delta V_{Im} \approx \frac{XP}{V_1} {{numeq}}$$
Takeaway: "The difference in voltage magnitude between the ends of the transmission line is mostly linked to the flow of reactive power through that line.
The difference in phase angle between the ends of a transmission line is mostly linked to the flow of active power through the line"
To handle calculation of these quantities in networks with many nodes, a node-analysis technique is used.
This is done by converting voltage sources into current source equivalents and impedances into admittance equivalents.
$$ \overline I_S = \frac{\overline V_S}{Z_S} {{numeq}} $$
$$ Y_x= \frac{1}{Z_x} {{numeq}} $$
To obey Kirchhoff's law, the sum of all currents entering a node must be zero.
For a simple network, this can be written as a sum of all currents flowing out of the node as positive and flowing to the node as negative (or vice versa).
(see example on page 166 in [1])

![[Pasted image 20250128130031.png]]


These equations can be re-written as the product of the admittance multiplied by the voltage drop.
In a very simple network with nodes 0, 1, 2 and 3 (Voltages are equal to \\(\overline V_n\\) ) where n is the node number and current \\(I_a\\) flowing from \\(V_0\\) to \\(V_1\\), \\(I_b\\) flowing from \\(V_0\\) to \\(V_2\\), and \\( I_c \\) flowing from \\( V_3\\) to \\( V_0 \\), (opposite direction). Then the Kirckhoffs law for node 0 will give the following sum:
$$ \overline I_a+ \overline I_b - \overline I_c = 0 {{numeq}} $$
can be rewritten as
$$ Y_a(\overline V_0 - \overline V_1) + Y_b(\overline V_0 - \overline V_2) - Y_c(\overline V_3 - \overline V_0) = 0 {{numeq}} $$
where \\(Y_n\\) is the admittance for each node
These may then be rewritten where each voltage is grouped
$$ (Y_a + Y_b + Y_c)\overline V_0 - (Y_a)\overline V_1 - (Y_b)\overline V_2 - (Y_c)\overline V_3 = 0 {{numeq}} $$
To go further we need to also write the equations for the nodes \\(V_1 \\), \\(V_2\\), and \\( V_3\\) as well.
If we expand the network with a reference node (voltage = 0) and an unknown current source \\(I_1\\) and add the current flows \\(I_d\\) from node 1 to reference through \\(Y_d\\), \\(I_e\\) from node 2 to reference through \\(Y_e\\) and \\(I_f\\) from node 3 to reference through \\(Y_f\\) and finally add the current source between reference node and \\(V_3\\) we have the following equations.
For Node 1:
$$ Y_d(\overline V_1-0)-Y_a(\overline V_0-\overline V_1)=0 {{numeq}} $$
For Node 2:
$$ Y_e(\overline V_2-0)- Y_b(V_0-V_2)=0 {{numeq}} $$
For Node 3:
$$ Y_f(\overline V_3-0)+Y_c(\overline V_3 - \overline V_0) = I_1 {{numeq}} $$
For the last Node 3, the sum is equal to I1 since this is an unknown(?) current source at this point.
When these are rewritten on the same form as (9)
For (10):
$$ (-Y_a)\overline V_0 + (Y_a+Y_d)\overline V_1 {{numeq}} $$
For (11):
$$ (-Y_b)\overline V_0 + (Y_e+Y_b)\overline V_2 {{numeq}} $$
for (12):
$$ (-Y_c)V_0 + (Y_c + Y_f)V_3 {{numeq}} $$
This can then be written in matrix form

$$ \begin{bmatrix}
Y_a + Y_b + Y_c& - Y_a & - Y_b & Yc \\\\
-Y_a & Y_a + Y_d & 0 & 0 \\\\
-Yb & 0 & Y_e + Y_b & 0 \\\\
-Yc & 0 & 0 & Y_c + Y_f
\end{bmatrix}
\begin{bmatrix}
\overline {V_0} \\\\ \overline {V_1} \\\\ \overline {V_2} \\\\ \overline {V_3}
\end{bmatrix} =
\begin{bmatrix}
0 \\\\ 0 \\\\ 0 \\\\ I_1
\end{bmatrix} 
$$

This matrice is symetrical along the diagonal and the values on the diagonal $ (i,i)$ elements are the admittance between the node (represented as columns in the matrix) and the reference node.
The elements not on the diagonal, the $(i,j)$ elements, are the negative admittances between nodes $i$ and $j$
This can be written more compact as 
$$ YV=I{{numeq}}$$ 
or solved for $V$:
$$ V=Y^{-1}I {{numeq}}$$

The Y matrix is often refered to as the admittance matrix and grows exponetially with the number of nodes, thus it is not feasible to solve for large networks. However, as most nodes are only connected to few nodes mostly (usually two or three other nodes) most of the elements in the Y matrix will be zero. 

#### Formulating the power flow problem
As each column in the Y matrix represents a node we can view one column in a nodal analysis.
If the column (or the node) $k$, in the matrix is concidered then Kirkhoffs law may be expressed as
$$\overline I_k = \sum_{i=1}^N Y_{ki}\overline V_i {{numeq}}$$
Here $I_k$ represents the current that generators and loads inject to the node, while the sum represents the power from the node to other nodes. If we multiply this equation with the node voltage $\overline V_k$  we get the complex conjugate power injected at node $k$
$$ 
\overline V_k \overline I_k = \overline S_k = \sum_{i=1}^N Y_{ki}\overline V_k \overline V_i {{numeq}}
$$

To evaluate this further it can be usefull to define the following:
$$Y_{ki} = G_{ki} + jB_{ki} {{numeq}}$$
where $G$ and $B$ are just the Real, $[Re]$, and imaginary $[Im]$ part of $Y$
Further $V_k$ and $V_i$ can be expressed as amplitudes and angles:
$$\overline V_k = V_k \angle \theta_k {{numeq}}$$ 
and 
$$\overline V_i = V_i \angle \theta_i {{numeq}}$$

Using this in $(20)$ it can be rewritten as
$$\overline S_k = \sum_{i=1}^N (G_{ki} - jB_{ki}) V_k V_i \angle (\theta_k-\theta_i) {{numeq}}$$
Changing to rectangular coordinates by isolating the $[Re]$ part with $cos$ and $[Im]$ part with $sin$ gives us
$$\overline S_k = \sum_{i=1}^N (G_{ki} - jB_{ki}) V_k V_i[cos(\theta_k-\theta_i)+jsin(\theta_k-\theta_i)] {{numeq}}$$

This can then be rewritten by expanding and separating the real and imaginary parts so that we get:

$$P_k^{inj}= Re(\overline S_k) = \sum_{i=1}^{N}(V_k V_i[G_{ki}cos(\theta_k-\theta_i)+B_{ki}sin(\theta_k-\theta_i)]){{numeq}}$$
$$Q_k^{inj}= Im(\overline S_k) = \sum_{i=1}^{N}(V_k V_i[G_{ki}sin(\theta_k-\theta_i)+B_{ki}cos(\theta_k-\theta_i)]){{numeq}}$$

Based on these power flow equations we can solve the unknows but since the equations contain both variables multiplied with eachother and transcendental functions solving them requires an iterative approach. Since they are non-linear they cannot be solved analytically or directly [1]. 

The Newton Raphson method is one way of a solution based on an iterative process where 
$$ x^{k+1}= x^k- \frac{f(x^k)}{f'(x^k)}$$.
This is derived from a approximation based on the Taylor series with the second order derivative and further omitted.
$$ f(x) \approx f(x^0)+f'(x^0)(x-x^0)+\frac{1}{2}f''(x^0)(x-x^0)^2+....$$ 
As we have several variables and functions to solve in the power flow equation case we need to concider the partial derivatives which can be written in taylor expansion as
$$ f(x,y) \approx f(x^0,y^0)+\delta $$


### Optimal Power Flow (OPF)
General principles

#### Linear OPF (DC)
Specifics for LOPF

#### Non-Linear OPF (AC)
Specifics for NLOPF

### Security Constrained Optimal Power Flow (SCOPF)
Specifics on OPF with security constraints


## References
### Basic Power Flow
[1]: Daniel S. Kirschen, Power Systems: Fundamental Concepts and the Transition to Sustainability | Wiley. Wiley, 2024. Tilgjengelig på: https://www.wiley.com/en-us/Power+Systems%3A+Fundamental+Concepts+and+the+Transition+to+Sustainability-p-9781394199525 
Chapter 8, 9, and 11 (34 pages)

[2]:A. Garcés, Mathematical Programming for Power Systems Operation: From Theory to Applications in Python. John Wiley & Sons, 2021.
3 chapters (30 pages)

### Optimal Power Flow
[3]:https://colab.research.google.com/github/climatechange-ai-tutorials/optimal-power-flow/blob/main/AI_for_Optimal_Power_Flow.ipynb
30 pages

[4]:https://pypsa.readthedocs.io/en/latest/user-guide/power-flow.html
10 pages


### Security Constrained Optimal Power Flow

[5]:https://github.com/csiro-energy-systems/PowerModelsACDCsecurityconstrained.jl
10 pages


[6]:R. Weinhold og R. Mieth, «Fast Security-Constrained Optimal Power Flow Through Low-Impact and Redundancy Screening», IEEE Transactions on Power Systems, bd. 35, nr. 6, s. 4574–4584, nov. 2020, doi: 10.1109/TPWRS.2020.2994764.
