

//used @ example 4 of tests\API Testing\Basics\_1_Post.spec.ts
export const stringFormat = (str: string, ...args : Array<string>) =>
    str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");

