/**
 * To add debounce or throttle support by adding decorator (@debounce_throttle(args)) before original function
 * @author LouisSung <ls@sysmaker.org>, All Rights Reserved
 * @version v1.0.0 (2019.12.05)
 * @licence MIT
 *
 * @param wait - Waiting time for the next valid event
 * @param immediate - Trigger time (true: immediate, false: after: waiting time)
 * @param limit - (For throttle only) Guarantee the execution (in `$limit` ms) even if the events keep happening
 *     Set as `0` to degrade to `debounce` (default)
 */
export function debounce_or_throttle(wait: number = 1000, immediate = true, limit = 0): MethodDecorator {
  // ref: https://css-tricks.com/debouncing-throttling-explained-examples/
  // ref: https://stackoverflow.com/a/35527852
  // ref@comment@jcdsr: https://plnkr.co/edit/3J0dcDaLTJBxkzo8Akyg?p=preview
  // ref: https://kanboo.github.io/2018/05/03/JS-debounce-throttle
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const origFunc = descriptor.value;
    let timerID: number = null;
    let startTime: number = null;
    /** Use throttle if `0 < limit < wait`; otherwise, use debounce instead */
    if (0 < limit && limit < wait) {
      descriptor.value = (...args) => {
        // discard old event timer
        clearTimeout(timerID);
        const currentTime: number = new Date().getTime();

        // set up throttle (the first one or the new one after waiting time)
        if (timerID === null) {
          startTime = currentTime;
          console.log('> start throttle: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
          if (immediate === true) {
            console.log('>> (fire) immediate: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
            origFunc.apply(this, args);
          }
        }

        // check if $limit exceeded (discard the old waiting timer)
        if (currentTime - startTime >= limit) {
          startTime = currentTime;
          console.log('>> (fire) reach the time limit: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
          origFunc.apply(this, args);
        } else {
          timerID = setTimeout(() => {    // function waitFunc()
            console.log('>> (throttle) waiting time exceeded !!', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
            if (immediate === false) {
              console.log('>> (fire) delayed: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
              origFunc.apply(this, args);
            }
            timerID = null;
          }, wait);
        }
      };
    } else {
      descriptor.value = (...args) => {
        clearTimeout(timerID);
        if (timerID === null) {
          console.log('> start debounce: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
          if (immediate === true) {
            console.log('>> (fire) immediate: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
            origFunc.apply(this, args);
          }
        }
        timerID = setTimeout(() => {
          console.log('>> (debounce) waiting time exceeded !!', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
          if (immediate === false) {
            console.log('>> (fire) delayed: ', new Date().getSeconds(), 's', new Date().getMilliseconds(), 'ms');
            origFunc.apply(this, args);
          }
          timerID = null;
        }, wait);
      };
    }
    return descriptor;
  };
}
