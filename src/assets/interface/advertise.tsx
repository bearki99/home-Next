export interface IResponse {
    code: number;
    data: IData;
    msg: string;
}

export interface IData {
    list: IAdvertisement[];
}

/**
 * 广告
 */
export interface IAdvertisement {
    author: IAuthor;
    comment_count: number;
    content: string;
    id: number;
    /**
     * base64
     */
    image: string;
    like_count: number;
    time: string;
    title: string;
    view_count: number;
}

/**
 * 作者
 */
export interface IAuthor {
    article_count: number;
    /**
     * base64
     */
    avatar: string;
    description: string;
    /**
     * 作者标识
     */
    id: number;
    username: string;
}