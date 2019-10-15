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
### 将npm设置成淘宝镜像
```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```
### 如何检测镜像是否设置成功呢？即查看镜像的配置结果
```
npm config get registry 

npm config get disturl  
```
### 使用nrm管理registry地址
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
### 提交正式版本
```
npm publish
```
下载正式版本
```
npm install @packageName
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
查看包信息
```
npm view

或者

npm info @baidu/packageName 
```
