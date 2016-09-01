# Make sure you do this before you start every homework/lab that requires submission to git (this assumes you've configured the upstream in lab2 already)

1. Fetch all the branches of that remote into remote-tracking branches, such as upstream/master: Do it by typing the command “git fetch upstream’

2. Make sure that you're on your master branch by typing “git checkout master”

3. Merge the changes from upstream/master into your local master branch. This brings your fork's master branch into sync with the upstream repository, without losing your local changes. Do this by typing “git rebase upstream/master"

4. Now, let’s do “git push origin master” to make sure your origin master has is up to date as well. (so far only your local/master is up to date)

# How to Submit Homework Via Github

You're going to submit homework via Git.

1. After you've done with your homework, navigate to your IOLab directory using the shell. 

2. Run a git status command in the shell and you should see the homework files appearing as untracked files

3. Create a new branch by running the command $ git checkout –b hw-[hwnumber]-branch

4. Stage the file by running $ git add .

5. Now commit $ git commit –m “submitting hw1” (hw1 for example)

5. Push the changes to your repo by running $ git push origin hw-1-branch

6. Then go to your browser and navigate to your repository, click on Compare & Pull Request

7. Head fork should be your own and base fork should be ours. Finally, click on create pull request to submit your homework

# Grade Distribution
40% final project delivery

40% weekly submissions (assignments + project milestones + reading responses)

20% participation (attendance and class-work)

# Due Dates & Late Policy

All homework assignments are due before 12pm on the submission date. 

Please submit all homework assignments via Git as normal. If you have issues submitting via Git, please submit via bCourses. Further instructions for submission will also be given during class.

There is a 20% penalty for each day an assignment is late. Our policy is not to extend due dates beyond their originally specified date, except under certain extenuating circumstances, which we will determine on a case-by-case basis. Please let us know as soon as possible if think you have any extenuating circumstances that will prevent you from submitting an assignment on time. **Please note that a heavy workload does not merit a deadline extension. We are designing the assignments to give you plenty of time to complete them. If you need help with an assignment, please ask on bCourses, come to office hours (TBD), or reach out to us to set up a meeting time.
