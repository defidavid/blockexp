import { previousBlocksSaga, blockTransactionsSaga } from './blocksSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        previousBlocksSaga(),
        blockTransactionsSaga()
    ]);
}
