import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, message, Space, Table } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { GrFormAdd } from "react-icons/gr";
import "./Garment.css";
import GarmentColorAPI from "../../service/garmentColor";
import { BsPlus } from "react-icons/bs";

const GarmentColor = () => {
  const [details, setDetails] = useState({
    name: "",
  });
  const [data, setData] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [state, setState] = useState({
    loading: false,
    open: false,
  });
  const [modeltitle, setTitle] = useState("Add New Color");
  // const [modal, contextHolder] = Modal.useModal();

  const { open, loading} = state;

  useEffect(() => {
    getAllColors();
  }, []);

  const getAllColors = async () => {
    await GarmentColorAPI.GETALL()
      .then((res) => {
        if (Array.isArray(res.data.data)) {
          setData(res.data.data);
        }
      })
      .catch((err) => {});
  };
  const showModal = () => {
    setState({
      open: true,
    });
  };
  const handleOk = async () => {
    // message.success("Submitted");
    if (!details.name) {
      alert("Color name is required");
      return;
    }

    if (selectedColor) {
      await GarmentColorAPI.PUT(selectedColor, details)
        .then((res) => {
          if (res?.data?.statusCode === 200) {
            message.success(res.data.msg || "Submitted");
            getAllColors();
            setState({ loading: false, open: false });
            setSelectedColor(null);
          }
        })
        .catch((err) => {
          message.success(err?.response?.data?.msg || "Error occured");
        });

      return;
    }

    await GarmentColorAPI.POST(details)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          message.success(res.data.msg || "Submitted");
          getAllColors();
          setState({ loading: false, open: false });
        }
      })
      .catch((err) => {
        message.error(err?.response?.data?.msg || "Error occured");
      });
  };

  const handleCancel = () => {
    setState({ open: false });
    setDetails({});
    if(selectedColor){
      setSelectedColor(null);
    }
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const handleInputs = (e) => {
    let name = e.target.name,
      value = e.target.value;
    setDetails({ ...details, [name]: value });
  };

  const handleSelectedColor = (row, type) => {
    if (type === "delete") {
      Modal.confirm({
        title: "Confirm",
        content: "Are you sure to delete",
        okText: "Yes Delete!",
        cancelText: "Cancel",
        onOk: () => handleDeleteColor(row._id),
      });
      return;
    }
    if (type === "edit") {
      setSelectedColor(row._id);
      const name = 'name';
      const value =  row.name;
      setDetails({ ...details, [name]: value });
      setState({ loading: false, open: true });
      setTitle("Edit Color")
      return;
    }
  };

  const handleDeleteColor = async (id) => {
    await GarmentColorAPI.DELETE(id)
      .then((res) => {
        getAllColors();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: "Color Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, row) => (
        <div>
          <Button
            type="text"
            onClick={() => handleSelectedColor(row, "edit")}
          >
            <FaPen color="skyblue" />
          </Button>
          <Button
            type="text"
            onClick={() => handleSelectedColor(row, "delete")}
          >
            <FaTrash color="red" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="div-add-button">
        <Button
          type="primary"
          onClick={showModal}
          className="add-button"
          icon={<BsPlus color="#fff" size={25} fill="white"/>}
          // icon={}
        >
          &nbsp;&nbsp;Add Color
        </Button>
        <Modal
          open={state.open}
          title={modeltitle}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            null
          }
        >
          <Form
            layout="vertical"
            onFinish={handleOk}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="color"
              label="Garment Color"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Enter Garment Color"
                value={details.name}
                name="name"
                onChange={handleInputs}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <Table
          // rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          style={{ margin: "0px 10px" }}
          size="small"
        />
        ,
      </div>
    </>
  );
};

export default GarmentColor;
