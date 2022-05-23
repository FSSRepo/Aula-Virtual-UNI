export class Publication {
    constructor(
        public id: string,
        public title: string,
        public summary: string,
        public assign: boolean,
        public created: any,
        public classe: string,
        public publisher: string,
        public images: Array<string>,
        public likes: Array<string>,
        public comments: number,
        public typep: string
    ){}
}
