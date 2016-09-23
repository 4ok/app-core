module.exports = class {

    splitByCols(items, numCols) {
        const result = [];
        const step = Math.ceil(items.length / numCols);

        items.forEach((item, index) => {
            // const numCol = index % numCols;
            // const numRow = Math.floor(index / numCols);

            const numRow = index % step;
            const numCol = Math.floor(index / step);

            if (!result[numCol]) {
                result[numCol] = [];
            }

            result[numCol][numRow] = item;
        });

        return result;
    }
};
