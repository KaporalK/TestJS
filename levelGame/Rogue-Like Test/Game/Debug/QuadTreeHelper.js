class QuadTreeHelper {

    static drawNode(node) {
        var bounds = node._bounds;
        noFill();
        rect(
            (bounds.x + 1) * COLISION_OFFSET,
            (bounds.y + 1) * COLISION_OFFSET,
            bounds.width * COLISION_OFFSET,
            bounds.height * COLISION_OFFSET
        );

        var len = node.nodes.length;
        for (var i = 0; i < len; i++) {
            this.drawNode(node.nodes[i]);
        }
    }
}