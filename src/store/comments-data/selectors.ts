import { NameSpace } from '../../const';
import { Comment } from '../../types/comments';
import { State } from '../../types/state';

export const getComments = (state: Pick<State, NameSpace.Comments>): Comment[] =>
  state[NameSpace.Comments].comments;
