module.exports = class {

    splitByCols(items, numCols, isOrderByRows) {
        const result = [];
        const step = Math.ceil(items.length / numCols);

        items.forEach((item, index) => {
            let numCol;
            let numRow;

            if (isOrderByRows) {
                numCol = index % numCols;
                numRow = Math.floor(index / numCols);
            } else {
                numCol = Math.floor(index / step);
                numRow = index % step;
            }

            if (!result[numCol]) {
                result[numCol] = [];
            }

            result[numCol][numRow] = item;
        });

        return result;
    }

    splitByRows(items, numRows, isOrderByCols) {
        const result = [];
        const step = Math.ceil(items.length / numRows);

        items.forEach((item, index) => {
            let numRow;
            let numCol;

            if (isOrderByCols) {
                numRow = index % step;
                numCol = Math.floor(index / step);
            } else {
                numRow = Math.floor(index / numRows);
                numCol = index % numRows;
            }

            if (!result[numRow]) {
                result[numRow] = [];
            }

            result[numRow][numCol] = item;
        });

        return result;
    }
};
