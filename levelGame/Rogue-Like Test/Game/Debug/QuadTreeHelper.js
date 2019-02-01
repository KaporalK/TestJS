class QuadTreeHelper {

    static drawNode(node) {
        var bounds = node._bounds;
        noFill();
        rect(
            (bounds.x + 1) ,
            (bounds.y + 1) ,
            bounds.width ,
            bounds.height
        );

        var len = node.nodes.length;
        for (var i = 0; i < len; i++) {
            this.drawNode(node.nodes[i]);
        }
    }
}