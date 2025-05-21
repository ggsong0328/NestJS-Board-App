import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; //데이터베이스 사용 X

  //모든 게시판 가져오기
  getAllBoards(): Board[] {
    return this.boards;
  }

  //게시판 생성
  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  //특정 ID로 게시물 가져오기
  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  //ID로 특정 게시물 지우기
  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }

  //특정 게시물 상태 업데이트
  updateBoardStatus(id: string, status: BoardStatus): Board | undefined {
    const board = this.getBoardById(id);
    board!.status = status;
    return board;
  }
}
