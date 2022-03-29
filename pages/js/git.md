## git密钥生成

```bash
ssh-keygen -o
cat ~/.ssh/id_rsa.pub
```

### 切换分支

- 切换远程分支

  ```bash
  git checkout <分支名> 
  ```

### 查看分支

- 查看本地分支

  ```bash
  git branch 
  ```

- 查看远程分支

  ```bash
  git branch -r
  ```

- 查看所有分支

  ```bash
  git branch -a 
  ```

### 合并分支

合并前需要推上代码，切换到要合并的分支

```bash
git checkout master
git merge <分支名>
```



### 撤销上一次commit 的内容

该操作会彻底回退到某个版本，本地的源码也会变为上一个版本的内容

```bash
git reset --hard <commit-id>
```



### 删除分支

**谨慎使用**

- 删除远程分支 

  ```bash
    git push origin --delete <分支名称>
  ```

- 删除本地分支

  ```bash
   git branch -d <分支名称>
  ```

### 本地有修改，但是想拉取远程分支代码

```bash
#首先将本地修改stash
git stash

#拉取最新代码
git pull

#弹出之前的修改
git stash pop
```

  