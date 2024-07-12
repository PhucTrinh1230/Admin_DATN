import Dropdown from 'react-bootstrap/Dropdown';

function DropdownProfile() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Danh mục sản phẩm
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Game hot</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Game sale</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Game free</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownProfile;