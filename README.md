

# **Frontend Challenge**

Thank you for taking this challenge! We want to see your thought process when designing and here are many valid approaches that we will accept. Please describe the assumptions and design decisions you made while completing this assignment. This challenge is expected to take 2 hours to complete.

We recommend completing this challenge ASAP it. If your challenge is aligned with expectations for the role, you will be asked to go over your submission with other members of the team. In accordance with our policies, we cannot provide feedback on submissions.


**Context**

Users on the Citrine Platform use AI Models to generate Material Candidates that they will then test in their lab. Material Candidates are each given a score based on the probability that they will achieve a set of design objectives. There will be 100 items on the list and you want to pick 5.

**Prompt**

Using the provided wireframe and application template, build a page that helps users browse the list of 100 candidates and choose up to 5 materials for testing.

*Materials Candidates have the following properties:*

- Score: Probability of achieving the objectives

- Ingredient amount: A list of ingredient strings and a numerical amount associated with the candidate

- Note: All items will have the same list of properties. The values may change between items.

**Requirements**

*Please incorporate the following requirements:*

- Build interactive list as seen on the left-hand side of the wireframe.

- Materials are plotted in a scatterplot with `Ingredient amount` as the x-axis and `Score` as the y-axis.

- When the checkbox in the list is toggled, the item is selected. The application should send an update to the selected candidates API

- Selected candidates should be indicated with a blue marker on the scatterplot and should be indicated by a checkmark in the list.

You may install any extra dependencies you need. Please list all additional dependencies you added and describe how they helped you complete this assignment. Please also ensure they are installed as part of running `npm start` or `npm test`.
  

Please include a brief (no more than 3 paragraphs) writeup with your submission describing your development plan and any challenges that came up during development. If you used more than 2 hours, please describe how you used the additional time.

  

When we evaluate your code, the first step will be to ensure all tests are passing without errors or skipped tests on the first try.

**Setup**

The scripts in this repo are configured to auto-install dependencies.

  

Assuming that you have node installed on your system, all you need to do to run the application is:

  

```sh

npm start

```

  

Similarly, to run tests:

  

```sh

npm test
```

# Remarks

I have approaced this problem by first understanding the data schema/representation and how it will be scatered across the application, then estimate the required components by dividing the page into multiple sections.
After that, I focused on how the data will be optained which turned out to be already impelemnted, hence i focused on the persistence, which I achieved by using react local state and heavy usage of react hooks to achieve maximum functionality and optimization. Since there is no specific design and the time is limited, I did not invest more time into the UI but its minimal with very intuitive UX.

I have done this in a bit more than 2 hours.

I struggled with the tests. after completing the challenge, I realized that 2 of the tests are failing hence tried to check. it turns out, I was missing a few things, in particular a label tag to wrap the input tag so as to help the testing library locate the accessible names of the input checkboxes. I googled around for the possible solutions and finally came to a final solution.



