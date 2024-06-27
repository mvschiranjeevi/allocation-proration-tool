# Instructions to run the code

1. Change into the allocation-protation-tool directory (command :- cd website and cd allocation-protation-tool)
2. Execute Makefile (command :- make all)
3. Terminate the process (command :- make stop)

# Regarding the tech stack and the backend logic

# Tech Stack

I have used the following tools to build this application.

1. Backend -> Node, Express, TypeScript
2. Frontend -> React, TypeScript, Tailwind CSS (Vite to setup the application)

# Logic-Backend

I initially implemented logic to prorate the allocated amount among investors and distribute any remaining amount equally. However, this approach overlooked the historical average amounts for each investor. Therefore, I switched to a recursive method, allocating the amount until the allocation amount becomes zero.
