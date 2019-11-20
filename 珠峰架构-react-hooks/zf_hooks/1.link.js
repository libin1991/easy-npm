let thirdHook = {
    state:3,
    next:null
}
let nextHook = {
    state:2,
    next:thirdHook
}
let firstHook = {
    state:1,
    next:nextHook
}