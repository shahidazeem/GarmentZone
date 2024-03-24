import React, { useState, useEffect } from "react";
import GarmentTypeAPI from "../../service/garmentType";
import { Modal, Button, Form, Input, message, Space, Table } from "antd";
// import { Table, Icon, Switch, Radio, Divider } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { GrFormAdd } from "react-icons/gr";
import "./Garment.css";
const GarmentType = () => {
 
  const [FormData, setFormData] = useState({
    type: "",
  });
  const [data, setData] = useState([]);
 useEffect(() => {
      getAllTypes();
    }, []);
      const getAllTypes = async () => {
        await GarmentTypeAPI.GETALLTYPES()
          .then((res) => {
            console.log(res);
            if (Array.isArray(res.data.data)) {
              setData(res.data.data);
            }
          })
          .catch((err) => {
       
          });
      };
  const [state, setState] = useState({
    loading: false,
    open: false,
  });
  const { open, loading } = state;
  const columns = [
    {
      title: "Garment Type",
      dataIndex: "type",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, row) => (
        <div>
          <Button type="text">
            <FaPen color="skyblue" />
          </Button>
          <Button type="text">
            <FaTrash color="red" />
          </Button>
        </div>
      ),
    },
  ];
  const handleInput = (e) => {
    let name = e.target.name,
      value = e.target.value;
    setFormData({ ...FormData, [name]: value });
  };

  const showModal = () => {
    setState({
      open: true,
    });
  };

  const handleOk = async () => {
    if (!FormData.type) {
      message.error("Garment Type is required!");
      return;
    }
    GarmentTypeAPI.SAVETYPE(FormData)
      .then((res) => {
        if (res?.data?.statusCode === 200) {
          message.success("Garment Type Saved Successfully..");
          setState({ loading: false, open: false });
          getAllTypes();
        }
      })
      .catch((err) => {
        message.error(err?.response?.data?.msg || "Error occured");
      });
  };

  const handleCancel = () => {
    setState({ open: false });
  };
  const onFinishFailed = () => {
    message.error("Garment Type is required!");
  };
  return (
    <>
      <div className="div-add-button">
        {/* {contextHolder} */}
        <Button
          type="primary"
          onClick={showModal}
          className="add-button"
          icon={<GrFormAdd color="#ffffff" />}
          // icon={}
        >
          &nbsp;&nbsp;Add Garment Type
        </Button>
        <Modal
          open={open}
          title="Add Garment Type"
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            layout="vertical"
            onFinish={handleOk}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="type"
              label="Garment Type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Enter Garment Type"
                name="type"
                onChange={handleInput}
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

export default GarmentType;
