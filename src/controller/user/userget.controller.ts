// import { Controller, Get, Param } from '@nestjs/common';
// import { CatsService } from '../../service/user.service';
// import { User } from '../../entities/user.entities';
// @Controller('gather')
// export class CatsController {
//   constructor(private readonly catsService: CatsService) {}
//   /**
//    * 获取一条数据
//    * @param params
//    * @returns
//    */
//   @Get('/get/:id')
//   async get(@Param() params) {
//     return await this.catsService.findOne(params.id);
//   }
//   // /**
//   //  * 获取所有数据
//   //  * @returns
//   //  */
//   // @Get(&quot;/all&quot;)
//   // async findAll() {
//   //     return await this.catsService.findAll()
//   // }
//   // /**
//   //  * 创建数据
//   //  * @param params
//   //  * @returns
//   //  */
//   // @Get('/create/:title/:age')
//   // async findOne(@Param() params) {
//   //     let cats = new Cats();
//   //     cats.title = params.title;
//   //     cats.age = params.age;
//   //     return await this.catsService.create(cats);
//   // }
//   // /**
//   //  * 删除一条数据
//   //  * @param params
//   //  * @returns
//   //  */
//   // @Get('/remove/:id')
//   // async remove(@Param() params) {
//   //     return await this.catsService.remove(params.id);
//   // }
// }
