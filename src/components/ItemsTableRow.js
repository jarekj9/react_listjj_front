import React from "react";

class ItemsTableRow extends React.Component {
    render() {
        const { id, name, value, active, onCheckboxClick } = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td>{value}</td>
                <td><input type="checkbox" checked={active} onChange={(e) => onCheckboxClick(id)} /></td>
            </tr>
        )
    }
}

export default ItemsTableRow;