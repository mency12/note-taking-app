import os
import subprocess
import random
from datetime import datetime, timedelta
 
# Configs
start_date = datetime.strptime("2025-02-11", "%Y-%m-%d")
project_root = "."
min_commits_per_day = 0
max_commits_per_day = 1
min_files_per_commit = 0
max_files_per_commit = 1
 
# Change working directory to the project
os.chdir(project_root)
 
# Collect all file paths (ignore .git)
files_to_commit = []
for root, dirs, files in os.walk("."):
    if ".git" in dirs:
        dirs.remove(".git")
    for file in files:
        files_to_commit.append(os.path.join(root, file))
 
files_to_commit.sort()
random.shuffle(files_to_commit)  # Add randomness in file order
 
# Commit loop
i = 0
day_offset = 0
 
while i < len(files_to_commit):
    current_date = start_date + timedelta(days=day_offset)
 
    # Random number of commits for the current day
    num_commits_today = random.randint(min_commits_per_day, max_commits_per_day)
 
    for _ in range(num_commits_today):
        if i >= len(files_to_commit):
            break
 
        # Random number of files in this commit
        files_batch = random.randint(min_files_per_commit, max_files_per_commit)
        commit_files = files_to_commit[i:i + files_batch]
 
        if not commit_files:
            break
 
        # Stage all files
        subprocess.run(["git", "add"] + commit_files)
 
        # Commit message
        last_file = os.path.basename(commit_files[-1])
        commit_msg = f"Feat: Added {last_file} file"
 
        # Commit time (noon)
        date_str = current_date.strftime("%Y-%m-%dT12:00:00")
        env = os.environ.copy()
        env["GIT_AUTHOR_DATE"] = date_str
        env["GIT_COMMITTER_DATE"] = date_str
 
        # Make the commit
        subprocess.run(["git", "commit", "-m", commit_msg], env=env)
 
        # Move file pointer
        i += files_batch
 
    # Move to the next day
    day_offset += 1
 
 