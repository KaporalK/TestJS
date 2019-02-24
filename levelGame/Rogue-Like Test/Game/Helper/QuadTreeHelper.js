class QuadTreeItemHelper{


    static purgeQuadTreeRetrieve(nodeItem){
        nodeItem = nodeItem.filter((item, index, self) =>
            index === self.findIndex((t) => (
                item === t
            ))
        );
        return nodeItem
    }
}