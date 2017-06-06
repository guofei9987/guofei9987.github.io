```py
import matplotlib.pyplot as plt
import numpy as np
x=np.linspace(0,6,1000)
y=np.sin(x)
z=np.cos(x**2)
plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2)
#label 可以用LaTeX
plt.plot(x,z,'b--',label='$cos(x^2)$')

plt.xlabel('Time(s)')
plt.ylabel('Volt')
plt.title('Pyplot')
plt.ylim(-1.2,1.2)
plt.legend()

plt.show()

```
