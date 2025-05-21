import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
