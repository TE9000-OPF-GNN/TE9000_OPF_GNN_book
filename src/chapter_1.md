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
It is also common to use a Per Unit value for other nodes which is a factor related to the base voltage of the slack node.

To further investigate this, some basic definitions and dependencies must be defined:

Voltages:
The voltages in a line can be calculated as 
$$
\overline{V_2} = \overline{V_1}- \frac{RP+XQ}{V[1]} -j\frac{XP+RQ}{V[1]} \tag{1}
$$

where R and X are the resistance and reactance of the line, and P and Q are the acitve and reactive power. (see page 164, eq 8.3)
or simpler
$$\overline{V_2} = \overline{V_1}- \Delta V_{Re} -j\Delta V_{Im} \tag{2}$$ 
As the reactance is normaly orders of magnitude larger than resistans this can be rewritten as the approximation:
$$ \Delta V_{Re} \approx \frac{XQ}{V_1} \tag{3}, 
\Delta V_{Im} \approx \frac{XP}{V_1} \tag{4}
$$
Takeaway: " The difference in voltage magnitude betweeen the ends of the transmission line is mostly linked to the flow of reactive power through that line. 
The difference in phase angle between the ends of a transmnission line is mostly linked to thre flow of active power through the line"

To handle calculation of these quantities in networks with many nodes a node-analysis technique is used. 
This is done by converting voltage sources into current source equivalents and impedances into admitance equivalents. 
$$ \overline I_S = \frac{\overline V_S}{Z_S} \tag{eq5}$$
$$ Y_x= \frac{1}{Z_x} \tag{eq6}$$

To obey Kirchows law the sum of all currents entering a node must be zero. 
For a simple network this can be written as a sum of all currents flowing out of the node as positive and flowing to the node as negative (or vice verca).
(see example in page 166)

![[Pasted image 20250128130031.png]]

These equations can be re-written as the product of the admitance multiplied by the voltage drop.
In a very simple network with nodes 0, 1, 2 and 3 (Voltages are equal to  $\overline V_n)$ where n is the node numer and current $I_a$ flowing from $V_0$ to $V_1$, $I_b$ flowing from $V_0$ to $V_2$, and $I_c$ flowing from $V_3$ to $V_0$, (oposite direction). Then the node 0 with the following sum:
$$ \overline I_a+ \overline I_b - \overline I_c = 0 \tag{eq7}$$
can be rewritten as 
$$ Y_a(\overline V_0 - \overline V_1) + Y_b(\overline V_0 - \overline V_2) - Y_c(\overline V_3 - \overline V_0) = 0
\tag{8}$$
 These may then be rewritten where each voltage is grouped
 $$ (Y_a + Y_b + Y_c)\overline V_0 - (Y_a)\overline V_1 - (Y_b)\overline V_2 - (Y_c)\overline V_3 = 0
\tag{9}$$ 

To go further we need to also to write the equations for the nodes $V_1$,  $V_2$, and $V_3$ as well. 
If we expand the network with a reference node (voltage = 0) and a unknown current source $I_1$ and add the current flows $I_d$ from node 1 to reference (through $Y_d$, $I_e$ from node 2 to reference thorugh $Y_e$ and $I_f$ from node 3 to reference  thorugh $Yf$ and finaly add the current source between reference node and $V_3$ we have the following equations.
For Node 1:
$$ Y_d(\overline V_1-0)-Y_a(\overline V_0-\overline V_1)=0 \tag{10}$$
For Node 2: 
$$ Y_e(\overline V_2-0)- Y_b(V_0-V_2)=0 \tag{11}$$
For Node 3: 
$$Y_f(\overline V_3-0)+Y_c(\overline V_3 - \overline V_0) = I_1\tag{12}$$
For the last Node 3, the sum is equlal to I1 since this is an unknown(?) current source at this point.

When these are rewritten on the same form as (9)
For (10):
$$(-Y_a)\overline V_0 + (Y_a+Y_d)\overline V_1 \tag{13}$$
For (11):
$$(-Y_b)\overline V_0 + (Y_e+Y_b)\overline V_2 \tag{14}$$
for (12)
$$ (-Y_c)V_0 + (Y_c + Y_f)V_3 \tag{15}$$
This can then be written on the matrix form
$$ \begin{bmatrix}
Y_a+Y_b+Y_c & -Y_a & -Y_b & -Yc \\
-Y_a&Y_a+Y_d&0&0\\
-Yb&0&Y_e+Y_b&0\\
-Yc&0&0&Y_c+Y_f\\
\end{bmatrix} 
\begin{bmatrix}
\overline V_0\\ \overline V_1&\\  \overline V_2\\ \overline V_3
\end{bmatrix} 
=
\begin{bmatrix}
0 \\ 0 \\ 0 \\I_1
\end{bmatrix}$$


### Optimal Power Flow (OPF)
General principles

#### Linead OPF (DC)
Specifics for LOPF

#### Non-Linear OPF (AC)
Specifics for NLOPF

### Security Constrained Optimal Power Flow (SCOPF)
Specifics on OPF with security constraints


## References
### Basic Power Flow
Daniel S. Kirschen, Power Systems: Fundamental Concepts and the Transition to Sustainability | Wiley. Wiley, 2024. Tilgjengelig på: https://www.wiley.com/en-us/Power+Systems%3A+Fundamental+Concepts+and+the+Transition+to+Sustainability-p-9781394199525 
Chapter 8, 9, and 11 (34 pages)

A. Garcés, Mathematical Programming for Power Systems Operation: From Theory to Applications in Python. John Wiley & Sons, 2021.
3 chapters (30 pages)

### Optimal Power Flow
https://colab.research.google.com/github/climatechange-ai-tutorials/optimal-power-flow/blob/main/AI_for_Optimal_Power_Flow.ipynb
30 pages

https://pypsa.readthedocs.io/en/latest/user-guide/power-flow.html
10 pages


### Security Constrained Optimal Power Flow

https://github.com/csiro-energy-systems/PowerModelsACDCsecurityconstrained.jl
10 pages


R. Weinhold og R. Mieth, «Fast Security-Constrained Optimal Power Flow Through Low-Impact and Redundancy Screening», IEEE Transactions on Power Systems, bd. 35, nr. 6, s. 4574–4584, nov. 2020, doi: 10.1109/TPWRS.2020.2994764.
