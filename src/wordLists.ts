export interface Word {
    id: string
    nativeWord: string
    foreignWordPhonetic?: string
    foreignWordWritten?: string
    theme?: string
    isAWord: boolean
}

export const frenchKoreanList = [
    {
        nativeWord: "pomme",
        foreignWordPhonetic: "sagwa",
        foreignWordWritten: "사과",
        theme: "fruits",
        isAWord: true
    },
    {
        nativeWord: "femme",
        foreignWordPhonetic: "anae",
        foreignWordWritten: "아내",
        theme: "person features",
        isAWord: true
    },
    {
        nativeWord: "voiture",
        foreignWordPhonetic: "cha",
        theme: "object",
        isAWord: true
    },
    {
        nativeWord: "ambition",
        foreignWordPhonetic: "keun tteus",
        foreignWordWritten: "큰 뜻",
        isAWord: true
    },
    {
        nativeWord: "aigle",
        foreignWordWritten: "독수리",
        isAWord: true
    },
    {
        nativeWord: "pomme",
        foreignWordPhonetic: "sagwa",
        foreignWordWritten: "사과",
        theme: "fruits",
        isAWord: true
    },
    {
        nativeWord: "femme",
        foreignWordPhonetic: "anae",
        foreignWordWritten: "아내",
        theme: "person features",
        isAWord: true
    },
    {
        nativeWord: "voiture",
        foreignWordPhonetic: "cha",
        theme: "object",
        isAWord: true
    },
    {
        nativeWord: "ambition",
        foreignWordPhonetic: "keun tteus",
        foreignWordWritten: "큰 뜻",
        isAWord: true
    },
    {
        nativeWord: "aigle",
        foreignWordWritten: "독수리",
        isAWord: true
    },
]