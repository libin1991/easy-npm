/**
 * @author libin
 * @file classname
 * Created by wuhan01 on 2017/7/4.
 */
const hasOwn: any = {}.hasOwnProperty;

export default function classNames(...list: Array<any>): string {
    const classes = [];

    for (let i = 0; i < list.length; i++) {
        const arg = list[i];
        if (!arg) {
            continue;
        }

        const argType = typeof arg;

        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames.apply(null, arg));
        } else if (argType === 'object') {
            for (const key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}
