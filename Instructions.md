# Instructions to run the code

Change into the allocation-protation-tool directory (command :- cd website and cd allocation-protation-tool)
Execute Makefile (command :- make all)
Terminate the process (command :- make stop)

# Regarding the tech stack and the backend logic

# Tech Stack

I have used the following tools to build this application.

Backend -> Node, Express, TypeScript
Frontend -> React, TypeScript, Tailwind CSS (Vite to setup the application)

# Logic-Backend

I initially implemented logic to prorate the allocated amount among investors and distribute any remaining amount equally. However, this approach overlooked the historical average amounts for each investor. Therefore, I switched to a recursive method, allocating the amount until the allocation amount becomes zero.
