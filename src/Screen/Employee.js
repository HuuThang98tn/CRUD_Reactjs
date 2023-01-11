import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle, InputGroup } from 'react-bootstrap'
import axios from 'axios'
// import AdvancedPagination from '../components/AdvancedPagination';
// import { Datas } from '../FakeData';
import Form from 'react-bootstrap/Form';
import * as XLSX from 'xlsx'
import AdvancedPagination from '../components/AdvancedPagination';
import { Navigate } from "react-router-dom";

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

    const [bang, setBang] = useState("")
    const [zip, setZip] = useState("")
    const [gmail, setGmail] = useState("")
    const [password, setPassword] = useState("")
    const [info, setInfo] = useState("")
    const [note, setNote] = useState("")
    const [status, setStatus] = useState("")
    const [valueStatus, setValustatus] = useState(null);
    const [bangSearch, setBangSearch] = useState("")
    const [gmailSearch, setGmailSearch] = useState("")

    const [Delete, setDelete] = useState(false)
    //Id for update record and Delete
    const [id, setId] = useState("");

    // on change states
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(30);
    // submit
    const [excelData, setExcelData] = useState([]);
    const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated"));

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Data.slice(indexOfFirstPost, indexOfLastPost);
    const URLS = "https://nodejs-crurd-bxv.herokuapp.com/api-v1/todos"


    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setauthenticated(loggedInUser);
            // console.log("-----------------", loggedInUser);
        }
    }, []);

    const GetEmployeeData = () => {
        var config = {
            method: 'get',
            url: `${URLS}/get-list`,
            headers: { 'token': `Bearer ${authenticated}` }
        };
        axios(config)
            .then(function (response) {
                setData(response.data.results)
                // setPostsPerPage(response.data.results)
            })
            .catch(function (error) {
                // console.log(error);
                alert(error)

            });
    }
    const handleSubmite = () => {
        var data = JSON.stringify({
            "bang": bang,
            "zip": zip,
            "gmail": gmail,
            "password": password,
            "info": info,
            "note": note,
            "status": status
        });
        var config = {
            method: 'post',
            url: `${URLS}/create`,
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${authenticated}`
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                window.location.reload()
            })
            .catch(function (error) {
                alert(error)
            });
    }
    const handleEdit = () => {

        var data = JSON.stringify({
            "_id": id,
            "bang": bang,
            "zip": zip,
            "gmail": gmail,
            "password": password,
            "info": info,
            "note": note,
            "status": status
        });
        var config = {
            method: 'post',
            url: `${URLS}}/update-byId`,
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${authenticated}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
                // alert(error)
            });

    }
    //handle Delete Function 
    const handleDelete = () => {
        var data = JSON.stringify({
            idData: id
        });
        var config = {
            method: 'post',
            url: `${URLS}/delete-byId`,
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${authenticated}`
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                // window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
                // alert(error)
            });
    }
    //call this function in useEffect
    useEffect(() => {
        GetEmployeeData();
    }, [])

    const searchView = () => {

        if (bangSearch.length > 0) {
            var data = JSON.stringify({
                "bang": bangSearch
            });
            var config = {
                method: 'post',
                url: 'https://nodejs-crurd-bxv.herokuapp.com/api-v1/search/bang',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${authenticated}`
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setData(response.data.results)
                    setBangSearch("")
                })
                .catch(function (error) {
                    alert(error);
                });
        } else {
            setBangSearch("")
            // window.location.reload()

        }
    }

    const searchViewGmail = () => {
        if (gmailSearch.length > 0) {
            var data = JSON.stringify({
                "gmail": gmailSearch
            });
            var config = {
                method: 'post',
                url: 'https://nodejs-crurd-bxv.herokuapp.com/api-v1/search/req-gmail',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `Bearer ${authenticated}`
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setData(response.data.results)
                    setGmailSearch("")
                })
                .catch(function (error) {
                    alert(error);
                });
        } else {
            setGmailSearch("")
            // window.location.reload()

        }
    }



    const handleSearchStatus = (e) => {
        // console.log(e.target.value);
        setValustatus(e.target.value);
        var data = JSON.stringify({
            "status": e.target.value
        });
        var config = {
            method: 'post',
            url: 'https://nodejs-crurd-bxv.herokuapp.com/api-v1/search/status',
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${authenticated}`

            },
            data: data
        };


        axios(config)
            .then(async function (response) {
                // console.log(response.data.results);
                setData(response.data.results)
            })
            .catch(function (error) {
                alert(error);
            });


    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("excel", excelFile);
        try {
            const response = await axios({
                method: "post",
                url: "https://nodejs-crurd-bxv.herokuapp.com/api-v1/todos/create-file-ex",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            axios(response)
                .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    window.location.reload()
                })
                .catch(function (error) {
                    // alert(error);
                    window.location.reload()

                });
        } catch (error) {
            console.log(error)
        }
    }
    const handleFile = (event) => {
        setExcelFile(event.target.files[0])
    }

    const handleDeleteAll = () => {
        var config = {
            method: 'post',
            url: 'https://nodejs-crurd-bxv.herokuapp.com/api-v1/todos/delete-all',
            headers: {
                'token': `Bearer ${authenticated}`
            }
        };
        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                window.location.reload()
            })
            .catch(function (error) {
                alert(error);
            });
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (authenticated === null || authenticated === undefined) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <div>
                <div>
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            height: "48px",
                            background: "#fff",
                            justifyContent: "flex-end",
                            padding: "16px",
                            alignItems: "center"
                        }}
                    >
                        <Button variant="success" onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                            Thêm địa chỉ gmail
                        </Button>
                        <Button
                            style={{ marginLeft: "12px" }}
                            variant="error" onClick={() => { handleDeleteAll() }}><i className='fa fa-plu'></i>
                            Xóa tất cả bản ghi
                        </Button>
                    </div>
                    <div
                        className='mt-3 row'
                        style={{
                            width: "100%",
                            height: "68px",
                        }}>


                        <div
                            style={{
                                width: "30%",
                                height: "48px",
                                position: "absolute",
                                right: "60%",
                                top: "30px"

                            }}
                            className='form'>
                            <form autoComplete="off"
                                onSubmit={handleSubmit}>
                                <label><h5>Tải file excle
                                </h5></label>

                                <div
                                    style={{ alignItems: "center", }}
                                    className='row'>
                                    <input
                                        style={{
                                            width: "50%",
                                            height: "100%"
                                        }}
                                        type='file' className='form-control'
                                        onChange={handleFile} required></input>
                                    {/* {excelFileError && <div className='text-danger'
                                    style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>} */}
                                    <button

                                        type='submit' className='btn btn-success'
                                        style={{ width: "20%", height: "100%", marginLeft: "10px" }}>Xác nhận</button>
                                </div>

                            </form>
                        </div>


                        <div
                            style={{
                                width: "15%",
                                height: "48px",
                                position: "absolute",
                                right: "45%",
                            }}
                            className='form-group'>
                            <Form.Select
                                value={valueStatus}
                                onChange={e => {
                                    handleSearchStatus(e)
                                    // console.log("e.target.value", e.target.value);
                                }}
                                aria-label="Default select example">
                                <option >Tìm theo trạng thái</option>
                                <option value="1">Pay</option>
                                <option value="2">Sai passWord</option>
                                <option value="3">2FA</option>
                                <option value="4">CVV</option>
                                <option value="5">Acc close</option>
                                <option value="6">Gỡ thẻ</option>
                                <option value="7">Không dủ pay</option>
                                <option value="8">Hết tiền</option>
                                <option value="9">Thẻ hết hạn</option>
                            </Form.Select>
                        </div>

                        <div
                            style={{
                                width: "20%",
                                height: "48px",
                                position: "absolute",
                                right: "25%",
                            }}
                            className='form-group'>
                            <InputGroup className="mb-3">
                                <input
                                    style={{

                                        height: "38px",
                                    }}
                                    required
                                    type="text" className='form-control'
                                    onChange={(e) => setBangSearch(e.target.value)}
                                    placeholder="Tìm kiếm theo bang..." />
                                <Button

                                    onClick={() => { searchView() }}
                                    variant="outline-secondary" id="button-addon2">
                                    Tìm kiếm
                                </Button>
                            </InputGroup>
                        </div>

                        <div
                            style={{
                                width: "20%",
                                height: "48px",
                                position: "absolute",
                                right: "5%",
                            }}
                            className='form-group'>
                            <InputGroup className="mb-3">
                                <input
                                    style={{
                                        height: "38px",
                                    }}
                                    required
                                    type="text" className='form-control'
                                    onChange={(e) => setGmailSearch(e.target.value)}
                                    placeholder="Tìm kiếm theo gmail..." />
                                <Button
                                    onClick={() => { searchViewGmail() }}
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
                                    <th>STT</th>
                                    <th>Bang</th>
                                    <th>Zip</th>
                                    <th>Gmail</th>
                                    <th>Password</th>
                                    <th>Info</th>
                                    <th>Status</th>
                                    <th>Note</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map((item, index) =>
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.bang}</td>
                                        <td>{item.zip}</td>
                                        <td>{item.gmail}</td>
                                        <td>{item.password}</td>
                                        <td>{item.info}</td>
                                        <td>{item.status === "1" ? "Pay"
                                            : item.status === "2" ? "Sai password"
                                                : item.status === "3" ? "2FA"
                                                    : item.status === "4" ? "CVV"
                                                        : item.status === "5" ? "Acc close"
                                                            : item.status === "6" ? "Gỡ thẻ"
                                                                : item.status === "7" ? "Không đủ pay"
                                                                    : item.status === "8" ? "Hết tiền"
                                                                        : item.status === "9" ? "Thẻ hết hạn" : "Không xác định"

                                        }</td>
                                        <td>{item.note}</td>

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
                        <div
                            style={{
                                position: "absolute",
                                right: "3%",
                                bottom: "16px",
                            }}
                        >
                            <AdvancedPagination
                                postsPerPage={postsPerPage}
                                totalPosts={Data.length}
                                paginate={paginate}
                            />
                        </div>
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
                            <Modal.Title>Xem dữ liệu nhân viên</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className='form-group'>
                                    <label>BANG</label>
                                    <input type="text" className='form-control' value={RowData.bang} readOnly />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>ZIP</label>
                                    <input type="email" className='form-control' value={RowData.zip} readOnly />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>GMAIL</label>
                                    <input type="text" className='form-control' value={RowData.gmail} readOnly />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>PASSWORD</label>
                                    <input type="text" className='form-control' value={RowData.password} readOnly />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>INFO</label>
                                    <input type="text" className='form-control' value={RowData.info} readOnly />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>TRẠNG THÁI</label>
                                    <input type="text" className='form-control' value={
                                        RowData.status === "1" ? "Pay"
                                            : RowData.status === "2" ? "Sai Password"
                                                : RowData.status === "3" ? "2FA"
                                                    : RowData.status === "4" ? "CVV"
                                                        : RowData.status === "5" ? "Acc close"
                                                            : RowData.status === "6" ? "Gỡ thẻ"
                                                                : RowData.status === "7" ? "Không đủ Pay"
                                                                    : RowData.status === "8" ? "Hết tiền"
                                                                        : RowData.status === "9" ? "Thẻ hết hạn" : "Không xác định"} readOnly />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>NOTE</label>
                                    <input type="text" className='form-control' value={RowData.note} readOnly />
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
                                        width: "45%",
                                        height: "68px",
                                    }}>
                                    {
                                        Delete && (
                                            <Button type='submit' className='btn btn-danger ' onClick={handleDelete}>Xóa bản ghi</Button>
                                        )
                                    }
                                </div>
                                <div
                                    style={{
                                        width: "20%",
                                        height: "68px",
                                    }}>
                                    <Button variant='secondary' onClick={hanldeViewClose}>Đóng</Button>
                                </div>
                            </div>

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
                                    <label>BANG</label>
                                    <input type="text" className='form-control' onChange={(e) => setBang(e.target.value)} placeholder="Vui lòng nhập bang" />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>ZIP</label>
                                    <input type="text" className='form-control' onChange={(e) => setZip(e.target.value)} placeholder="Vui lòng nhập mã zip" />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>GMAIL</label>
                                    <input type="email" className='form-control' onChange={(e) => setGmail(e.target.value)} placeholder="Vui lòng nhập gmail" />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>PASSWORD</label>
                                    <input type="text" className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder="Vui lòng nhập password" />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>INFO</label>
                                    <input type="text" className='form-control' onChange={(e) => setInfo(e.target.value)} placeholder="Vui lòng nhập địa chỉ" />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>STATUS</label>
                                    <input type="text" className='form-control' onChange={(e) => setStatus(e.target.value)} placeholder="Vui lòng nhập trạng thái" />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>NOTE</label>
                                    <input type="text" className='form-control' onChange={(e) => setNote(e.target.value)} placeholder="Vui lòng nhập ghi chú" />
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
                            <Modal.Title>Chỉnh sửa bản ghi</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className='form-group'>
                                    <label>BANG</label>
                                    <input type="text" className='form-control' onChange={(e) => setBang(e.target.value)} placeholder="Vui lòng nhập bang" defaultValue={RowData.bang} />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>ZIP</label>
                                    <input type="text" className='form-control' onChange={(e) => setZip(e.target.value)} placeholder="Vui lòng nhập mã zip" defaultValue={RowData.zip} />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>GMAIL</label>
                                    <input type="email" className='form-control' onChange={(e) => setGmail(e.target.value)} placeholder="Vui lòng nhập gmail" defaultValue={RowData.gmail} />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>PASSWORD</label>
                                    <input type="text" className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder="Vui lòng nhập password" defaultValue={RowData.password} />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>INFO</label>
                                    <input type="text" className='form-control' onChange={(e) => setInfo(e.target.value)} placeholder="Vui lòng nhập địa chỉ" defaultValue={RowData.info} />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>STATUS</label>
                                    <input type="text" className='form-control' onChange={(e) => setStatus(e.target.value)} placeholder="Vui lòng nhập trạng thái" defaultValue={RowData.status} />
                                </div>
                                <div className='form-group mt-3'>
                                    <label>NOTE</label>
                                    <input type="text" className='form-control' onChange={(e) => setNote(e.target.value)} placeholder="Vui lòng nhập ghi chú" defaultValue={RowData.note} />
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
                                        width: "45%",
                                        height: "68px",
                                    }}
                                >
                                    <Button type='submit' className='btn btn-warning' onClick={handleEdit}>Chỉnh sửa bản ghi</Button>

                                </div>
                                <div
                                    style={{
                                        width: "20%",
                                        height: "68px",
                                    }}>
                                    <Button variant='secondary' onClick={hanldeEditClose}>Hủy</Button>

                                </div>
                            </div>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div >
        );
    }
};

export default Employee;