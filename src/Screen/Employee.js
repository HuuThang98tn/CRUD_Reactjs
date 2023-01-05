import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle, InputGroup } from 'react-bootstrap'
import axios from 'axios'
// import AdvancedPagination from '../components/AdvancedPagination';
import { Datas } from '../FakeData';
import Form from 'react-bootstrap/Form';

const Employee = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }

    //Define here local state that store the form Data
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [number, setnumber] = useState("")
    const [textSearch, setTextSearch] = useState("")
    const [address, setaddress] = useState("")

    const [Delete, setDelete] = useState(false)
    //Id for update record and Delete
    const [id, setId] = useState("");
    const GetEmployeeData = () => {
        //here we will get all employee data
        const url = 'http://localhost:8000/employee'
        axios.get(url)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    setData(data)
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleSubmite = () => {
        const url = 'http://localhost:8000/employee'
        const Credentials = { name, email, number, address }
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleEdit = () => {
        const url = `http://localhost:8000/employee/${id}`
        const Credentials = { name, email, number, address }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    //handle Delete Function 
    const handleDelete = () => {
        const url = `http://localhost:8000/employee/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    alert(message)
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    //call this function in useEffect
    console.log(ViewShow, RowData)
    useEffect(() => {
        GetEmployeeData();
    }, [])





    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    //   {/* <Pagination
    //                 // postsPerPage={postsPerPage}
    //                 // totalPosts={posts.length}
    //                 // paginate={paginate}
    //                 /> */}
    return (
        <div>
            <div>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "68px",
                        background: "#fff",
                        justifyContent: "flex-end",
                        padding: "16px",
                        alignItems: "center"
                    }}
                >
                    <Button variant="success" onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Thêm địa chỉ gmail
                    </Button>
                </div>
                <div
                    className='mt-3'
                    style={{
                        width: "100%",
                        height: "68px",
                    }}>
                    <div
                        style={{
                            width: "30%",
                            height: "48px",
                            position: "absolute",
                            right: "16px",
                        }}
                        className='form-group'>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Tìm kiếm..."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                            <Button
                                onClick={()=>{
                                    console.log("ok");
                                }}
                            variant="outline-secondary" id="button-addon2">
                                Tìm kiếm
                            </Button>
                        </InputGroup>
                    </div>

                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table
                        className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Địa chỉ gmail</th>
                                <th>SĐT</th>
                                {/* <th>NIC</th> */}
                                <th>Địa chỉ liên lạc</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Datas.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.number}</td>
                                    {/* <td>{item.nic}</td> */}
                                    <td>{item.address}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button
                                            className='col-md-3'
                                            size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>Chi tiết</Button>||
                                        <Button
                                            className='col-md-3'
                                            size='sm' variant='warning' onClick={() => { handleEditShow(SetRowData(item), setId(item._id)) }}>Chỉnh sửa</Button> ||
                                        <Button
                                            className='col-md-2'
                                            size='sm' variant='danger' onClick={() => { handleViewShow(SetRowData(item), setId(item._id), setDelete(true)) }}>Xóa</Button>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Employee Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.name} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.email} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.number} readOnly />
                            </div>
                            {/* <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.nic} readOnly />
                            </div> */}
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.address} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm địa chỉ gmail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Vui lòng nhập tên" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Vui lòng nhập email" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Vui lòng nhập số điện thoại" />
                            </div>
                            {/* <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter NIC" />
                            </div> */}
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Vui lòng nhập địa chỉ" />
                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div
                            className='row'
                            style={{
                                width: "100%",
                                height: "68px",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}>
                            <div
                                style={{
                                    width: "35%",
                                    height: "68px",
                                }}
                            >
                                <Button type='submit' className='btn btn-success ' onClick={handleSubmite}>Thêm địa chỉ</Button>

                            </div>
                            <div
                                style={{
                                    width: "20%",
                                    height: "68px",
                                }}>
                                <Button variant='secondary' onClick={hanldePostClose}>Đóng</Button>

                            </div>
                        </div>

                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for Edit employee record */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Vui lòng nhập tên" defaultValue={RowData.name} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Vui lòng nhập email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Vui lòng nhập số điện thoại" defaultValue={RowData.number} />
                            </div>
                            {/* <div className='form-group mt-3'>
                                <label>NIC</label>
                                <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic} />
                            </div> */}
                            <div className='form-group mt-3'>
                                <label>Address</label>
                                <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Vui lòng nhập địa chỉ" defaultValue={RowData.address} />
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div >
    );
};

export default Employee;