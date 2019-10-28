### npm管理项目版本号
在命令行窗口输入npm version ?可以查看可以使用的命令：
```
major: 主版本号
premajor: 预备主版本
minor: 次版本号
preminor: 预备次版本
patch: 修订号
prepatch: 预备修订版
prerelease: 预发布版本
```
### 将npm设置成NPM镜像或者淘宝镜像
```
npm config set registry http://registry.npmjs.org
// 全局配置切换到官方源
npm config set registry http://www.npmjs.org

npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global

// 检测是否切换到了淘宝源
npm get registry
```
### 如何检测镜像是否设置成功呢？即查看镜像的配置结果
```
npm config get registry 

npm config get disturl  
```

### 使用**nrm**管理registry地址
安装nrm
```
npm install -g nrm
```
查看镜像列表
```
nrm ls
```
切换镜像
```
nrm use taobao
```
增加
```
nrm add [name] http://registry.npm.frp.trmap.cn/
```
删除
```
nrm del <registry-name>
```
测试速度
```
nrm test npm                
```

### 提交正式版本
```
npm login
npm publish
```
下载正式版本
```
npm install @packageName
```

### 安装失败
```
sudo npm i --unsafe-perm

npm install --unsafe-perm=true --allow-root
```

### 测试包发布

> 在测试版本中 的package.json我们修改成 "version": "1.0.0-beta",

提交测试版:
```
npm publish --tag=beta
```
安装测试版
```
npm install @baidu/packageName@beta
```
查看包信息,使用npm view xxx或npm v xxx可以查看包信息
```
npm view

或者

npm info @baidu/packageName 
```


---

### 查看当前目录下安装了哪些node包
```
npm ls

-> npm ls
 
 xcx@1.0.0 /Users/*/node/xcx
└── axios@0.18.0 extraneous
```

### 登陆npm
```
-> npm login

Username: leinov
Password:
Email: (this IS public)
Email: (this IS public) 1425795233@qq.com
Logged in as leinov on http://registry.npmjs.org/.
```

### 查看当前npm用户
```
-> npm whoami

leinov //当前用户
```

### 查看node安装路径
```
npm get prefix

/Users/****/v8.11.3
```

### 查看全局node包
```
$ npm root -g 
  
  /Users/*****/node_modules
```

### npm清理缓存
```
npm cache clean -f
```

---
### 修复npm安装全局模块命令失效
> 原因：
npm config get prefix //查看默认全局安装路径
对于大多数系统显示目录为：/usr/local
而我的目录是安装目录/app/node

> 解决：
修改默认全局安装路径
```
//1.新建一个全局安装的路径
mkdir ~/.npm-global 
//2.配置npm使用新的路径
npm config set prefix '~/.npm-global'
//3.打开或者新建~/.profile，加入下面一行
export PATH=~/.npm-global/bin:$PATH
//4、更新系统环境变量
source ~/.profile
```


### 使用npm view xxx或npm v xxx可以查看包信息
如果你只是想看安装包**最近**的版本信息，你可以这样：
```
> npm v vue version
> 2.5.17
```
如果你想获取安装包完整的版本信息列表，你可以使用复数形式，例如：
```
> npm v vue versions
> [ '0.0.0',
  '0.6.0',
  '0.7.0',
  ...
  '2.5.15',
  '2.5.16',
  '2.5.17-beta.0',
  '2.5.17' ]
```

### 安装指定版本安装包
如果你想安装一个不是最新版本的安装包，你可以指定某个版本来安装，如：
```
npm i vue@2.5.15
```
鉴于记住标签比记住版本数字容易多了，你可以使用用npm v命令来查到的版本信息列表里面的dist-tag来安装,比如：
```
npm i vue@beta
```

### 搜索安装包
有时候你不能明确记得你曾经使用过的或者朋友推荐的包名，这种情况下，你可以使用npm search从终端直接执行搜索，如：
```
npm search gulp debug

或者

npm s gulp debug
```
这将打印出包含说明、作者等其他信息的安装包列表。


### 卸载包
如果你不想转到package.json文件并手动删除依赖包，则可以用以下方法删除：
```
npm uninstall vue
```
这个命令会删除node_modules文件夹及package.json中对应的包。当然，你也可以用rm,un或者r来达到相同的效果:
```
npm rm vue
```
如果由于某些原因，你只想从node_modules文件夹中删除安装包，但是想在package.json中保留其依赖项，那么你可以使用no-save标志，如：
```
npm rm vue --no-save
```

### 依赖枚举
如果你想看一下你的项目依赖了哪些安装包，你可以这样看：
```
npm ls
```
这个命令会将你项目的依赖列举出来，并且各个安装包的依赖也会显示出来。如果你只想看本项目的依赖，你可以这样：
```
npm ls --depth=0
```
这样打印出来的结果就是本项目的依赖，像这样：
```
├── jquery@3.3.1
├── vue@2.5.17
└── yarn@1.12.3
```
当然，你也可以加上g来看看你全局安装的依赖包，如：
```
npm ls -g -depth 0
```

### 过期依赖枚举
大多数时候，你需要保持本地依赖的更新，你可以在项目目录下先查看一下安装包有没有版本更新，如：
```
npm outdate
```
这个命令将会列出所有你可能有更新的过时的安装包列表.
