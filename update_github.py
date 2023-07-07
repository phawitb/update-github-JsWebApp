import requests
import base64

repo_owner = "phawitb"
repo_name = "adjustHT4"
file_path = "adjust_error.txt"
access_token = "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"

def update_file(file_content):
    # file_content = "hellllooooo"  
    file_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{file_path}"
    headers = {"Authorization": f"token {access_token}"}
    response = requests.get(file_url, headers=headers)
    file_data = response.json()

    print('file_data',file_data)

    new_content = base64.b64encode(file_content.encode('utf-8')).decode('utf-8')
    commit_message = "Update file via web app"
    payload = {
        "message": commit_message,
        "content": new_content,
        "sha": file_data['sha']
    }
    update_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{file_path}"
    response = requests.put(update_url, json=payload, headers=headers)

    if response.status_code == 200:
        return True
    else:
        return False

file_content = "helllloooooxxxzzz"
update_file(file_content)

