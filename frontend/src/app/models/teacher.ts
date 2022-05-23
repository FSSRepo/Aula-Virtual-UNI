export class Teacher {
    constructor(
        public id: string,
        public name: string,
        public groups: Array<string>,
        public photo: string,
        public careers: Array<string>
    ){}
    getGroups(){
        let groups = '';
        let index = 0;
        for (const it of this.groups){
          groups += it + (index < this.groups.length - 1 ? ', ' : '');
          index++;
        }
        return groups;
      }
      getCareers(){
        let careers = '';
        let index = 0;
        for (const it of this.careers){
          careers += it + (index < this.careers.length - 1 ? ', ' : '');
          index++;
        }
        return careers;
      }
}
