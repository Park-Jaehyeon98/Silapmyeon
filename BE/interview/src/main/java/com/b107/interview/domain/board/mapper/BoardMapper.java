package com.b107.interview.domain.board.mapper;
import com.b107.interview.domain.board.dto.BoardAllResponse;
import com.b107.interview.domain.board.dto.BoardRequest;
import com.b107.interview.domain.board.entity.Board;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BoardMapper {

    @Mapping(target = "boardTitle",source = "title")
    @Mapping(target = "boardContent",source = "content")
    @Mapping(target = "comments", ignore = true)
    Board boardRequestToBoard(BoardRequest boardRequest);


}
