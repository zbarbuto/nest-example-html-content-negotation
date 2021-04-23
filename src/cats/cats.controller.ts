import { Controller, Get } from '@nestjs/common';
import { ViewAs } from 'src/view-as.decorator';

@Controller('cats')
export class CatsController {
  @Get()
  @ViewAs('index')
  root() {
    return {
      cats: [
        {
          name: 'Jim',
        },
        {
          name: 'Bob',
        },
        {
          name: 'Susan',
        },
      ],
    };
  }
}
