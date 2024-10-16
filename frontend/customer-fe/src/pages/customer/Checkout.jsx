import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Divider, Breadcrumbs, Modal, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tabs, Tab, Select, MenuItem } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/customer/Footer';
import Header from '../../components/customer/Header';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddIcon from '@mui/icons-material/Add';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };

  const locations = [
    {
      province: 'Hà Nội',
      districts: [
        {
          name: 'Quận Hoàng Mai',
          wards: ['Phường Giáp Bát', 'Phường Định Công']
        },
        {
          name: 'Quận Hà Đông',
          wards: ['Phường Mộ Lao', 'Phường Vạn Phúc']
        }
      ]
    },
    {
      province: 'TP. Hồ Chí Minh',
      districts: [
        {
          name: 'Quận 1',
          wards: ['Phường Bến Nghé', 'Phường Bến Thành']
        },
        {
          name: 'Quận 3',
          wards: ['Phường 7', 'Phường 10']
        }
      ]
    }
  ];
const Checkout = () => {
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleChangeAddress = (event) => {
        setSelectedAddress(event.target.value);
    };
  
    const addresses = [
        {
          value: 'address1',
          name: 'Thanh Ngọc',
          phone: '0372204069',
          address: 'Số nhà 05, ngõ 42/2a đường Thanh Bình, Phường Mộ Lao, Quận Hà Đông, Hà Nội',
        },
        {
          value: 'address2',
          name: 'Nguyễn Văn A',
          phone: '0123456789',
          address: 'Số nhà 10, ngõ 3 đường Giáp Bát, Phường Giáp Bát, Quận Hoàng Mai, Hà Nội',
        },
        {
          value: 'address3',
          name: 'Trần B',
          phone: '0987654321',
          address: 'Số 20, ngõ 22 đường Đại La, Phường Trương Định, Quận Hai Bà Trưng, Hà Nội',
        },
        // Add more addresses to simulate scrolling
        {
          value: 'address4',
          name: 'Phạm C',
          phone: '0987654321',
          address: 'Số 22, ngõ 12 đường Trần Đại Nghĩa, Hà Nội',
        },
        {
          value: 'address5',
          name: 'Lê D',
          phone: '0987654321',
          address: 'Số 30, ngõ 15 đường Cầu Giấy, Hà Nội',
        },
        // Continue adding more items to test scrolling
      ];
    const location = useLocation();
  const { selectedProducts, selectedTotal } = location.state || {}; 
  console.log(selectedProducts)
  const [address, setAddress] = useState('');
  const [shippingFee, setShippingFee] = useState(50000); // Phí vận chuyển cố định (hoặc có thể tính động)
 const navigate = useNavigate()
  // Tính tổng tiền cần thanh toán
  const totalAmount = selectedTotal + shippingFee;

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }
    // Thực hiện hành động đặt hàng ở đây (gửi API, lưu vào CSDL, etc.)
    alert('Đơn hàng đã được đặt thành công!');
  };

  const handleClick =() =>{

  }

  const [openDelivery, setOpenDelivery] = React.useState(false);
  const handleOpenDelivery = () => setOpenDelivery(true);
  const handleCloseDelivery = () => setOpenDelivery(false);

  const [openNewAddress, setOpenNewAddress] = React.useState(false);
  const handleOpenNewAddress = () => setOpenNewAddress(true);
  const handleCloseNewAddress = () => setOpenNewAddress(false);





  const [tab, setTab] = useState(0); // Tab index
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Lấy danh sách huyện dựa trên tỉnh đã chọn
  const districts = selectedProvince
    ? locations.find((location) => location.province === selectedProvince)?.districts
    : [];

  // Lấy danh sách xã dựa trên huyện đã chọn
  const wards = selectedDistrict
    ? districts.find((district) => district.name === selectedDistrict)?.wards
    : [];

  // Xử lý khi chọn tỉnh
  const handleProvinceSelect = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
    setSelectedWard('');
    setTab(1); // Chuyển sang tab huyện
  };

  // Xử lý khi chọn huyện
  const handleDistrictSelect = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedWard('');
    setTab(2); // Chuyển sang tab xã
  };

  // Xử lý khi chọn xã
  const handleWardSelect = (event) => {
    setSelectedWard(event.target.value);
  };

  return (
    <div  className="bg-customBackground" style={{ }}>
    <Box className="sticky top-0 bg-white shadow-lg z-50">
      <Header></Header>
    </Box>
    <Box style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 20
      }}>
        <Box style={{
            width: '70%',
        }}>
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Checkout
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Items
              </Link>
              {/* <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography> */}
            </Breadcrumbs>
          </div>
            <Box sx={{
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 2
            }}>
                <Typography  variant="h4">Checkout</Typography>
            </Box>
            <Box
                sx={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)',
                    backgroundPositionX: '-30px',
                    backgroundSize: '116px 3px',
                    height: '3px',
                    width: '100%',
                }}
                />
            <Box sx={{width: '100%', backgroundColor:"white", borderRadius: 2, height: 'auto', padding : 2, }} className="shadow-xl">
                    <Box sx={{display:'flex', alignItems: "center"}}>
                        <FmdGoodIcon sx={{color: "#6FCFB8"}}></FmdGoodIcon>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 20, color: "#6FCFB8"}}>Delivery address</Typography>
                    </Box>
                    <Box sx={{display:'flex', justifyContent: 'space-between', padding: 1}}>
                        <Typography>Payment method</Typography>                
                            <Button onClick={handleOpenDelivery}>Change</Button>
                    </Box>
                </Box>
            
            <Box sx={{width: "100%",display: 'flex', justifyContent: 'center', height: 'auto', marginBottom: 2}}>
                <Box sx={{width: '100%'}}>
                <Box sx={{}}>
               
                <Box className="overflow-y-auto  custom-scrollbar" sx={{padding: 2, backgroundColor: 'white', marginTop: 2, marginBottom: 2,  borderRadius: 2}}>
                {selectedProducts && selectedProducts?.map((product) => (
                    <Box key={product.id} sx={{
                      display: 'flex',
                      marginTop: 2,
                      
                      padding: 2,
                      borderRadius: 1,
                      borderBottom: "1px solid #ccc"
                    }}>
                    <Divider />
                        {/* Checkbox để chọn sản phẩm */}
                   
                      {/* Hình ảnh sản phẩm */}
                      <img
                        alt={product.image}
                        src={product.image}
                        className="group-hover:scale-105"
                        style={{ height: 70, width: 50, borderRadius: 1 }}
                      />

                      <Box sx={{ width: '100%', margin: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: 2 }}>
                          <Box>
                            <Typography>{product.name}</Typography>
                            <Typography sx={{ color: '#ccc' }}>
                              {typeof product.color === 'string' ? JSON.parse(product.color).name : product.color.name } | 
                              {typeof product.size === 'string' ? JSON.parse(product.size).name : product.size.name}
                            </Typography>

                            <Typography>${product.price}</Typography>
                          </Box>

                          {/* Input cho số lượng */}
                          <div className="">
                          <Typography>{product.quantity}</Typography>
                           
                          </div>

                          <div className="">
                          <Typography>{product.quantity*product.price}</Typography>
                           
                          </div>

                          {/* Nút xoá sản phẩm */}
                         
                        </Box>



                      </Box>
                      
                      <Divider />
                    </Box>
                  ))}
                </Box>
                </Box>
                <Box sx={{width: '100%', backgroundColor:"white", borderRadius: 2, height: 400, padding : 2, }} className="shadow-xl">
                    {/* <Typography sx={{ fontWeight: 'bold', fontSize: 22,}}>Oder Summary</Typography> */}
                    <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2}}>
                        <Typography sx={{display:'flex', alignItems:'center'}}>Payment method</Typography>
                        <Box sx={{display:'flex', alignItems:'center'}}>
                            <Typography> Card</Typography>
                            <Button>Change</Button>
                        </Box>
                    </Box>
                    <Divider></Divider>
                    <Box sx={{float: 'right'}}>
                        <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2}}>
                            <Typography>Merchandise Subtotal:</Typography>
                            <Typography>$5.00</Typography>
                        </Box>
                        {/* <Divider></Divider> */}
                        <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2}}>
                            <Typography>Shipping Total</Typography>
                            <Typography>$8.32</Typography>
                        </Box>
                        {/* <Divider></Divider> */}
                        <Box sx={{display:'flex', justifyContent: 'space-between', padding: 2, marginBottom: 3}}>
                            <Typography sx={{ fontSize: 18}}>Total Payment</Typography>
                            <Typography  sx={{ fontSize: 18}}>{selectedTotal}</Typography>
                        </Box>
                    </Box>
                    <Button sx={{width: '100%'}} variant="contained" 
                    onClick={()=>{
                      navigate('/checkout', {
                        state: {
                          selectedProducts,
                          selectedTotal,
                        },
                      });}}
                      >Check out</Button>
                    
                </Box>
                </Box>
            </Box>
            <Divider></Divider>
    
            
        </Box>
        
    </Box>
    <Box sx={{marginTop: 4}}>
      <Footer></Footer>
    </Box>

    <Modal
        open={openDelivery}
        onClose={handleCloseDelivery}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      <FormLabel id="demo-radio-buttons-group-label">My Address</FormLabel>
      <Divider sx={{ marginTop: 2 }} />

      {/* Bật scroll cho danh sách địa chỉ */}
      <Box sx={{ maxHeight: 300, overflowY: 'auto', marginTop: 2, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        <FormControl>
          <RadioGroup
            aria-labelledby="gender-selector-label"
            value={selectedAddress}
            name="radio-buttons-group"
            onChange={handleChangeAddress}
          >
            {addresses.map((address, index) => (
              <FormControlLabel
                key={index}
                value={address.value}
                control={<Radio />}
                label={
                  <Box sx={{ width: "100%",display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ marginTop: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{address.name}</Typography>
                        <Typography sx={{ color: 'rgba(0, 0, 0, .54)', fontSize: 14 }}>
                          | {address.phone}
                        </Typography>
                      </Box>
                      <Typography sx={{ color: 'rgba(0, 0, 0, .54)', fontSize: 14 }}>
                        {address.address}
                      </Typography>
                    </Box>
                    <Box>
                      <Button>Edit</Button>
                    </Box>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        <Button onClick={() =>{
            handleOpenNewAddress();
            handleCloseDelivery()
        }}>
          <AddIcon /> Add new Address
        </Button>
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleCloseDelivery}>Cancel</Button>
        <Button >Confirm</Button>
      </Box>
    </Box>
      </Modal>

      <Modal
        open={openNewAddress}
        onClose={handleCloseNewAddress}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormLabel id="demo-radio-buttons-group-label">New Address</FormLabel>
      <Divider sx={{ marginTop: 2 }} />

      {/* Bật scroll cho danh sách địa chỉ */}
      <Box sx={{ maxHeight: 600, marginTop: 2}}>
        <Box sx={{display: 'flex', mb: 2}}>
            <TextField  size="small" id="outlined-basic" label="Họ và tên" variant="outlined" />
            <TextField  size="small" id="outlined-basic" label="Số điện thoại" variant="outlined" />
        </Box>

        <Box>
        <Tabs value={tab} onChange={handleTabChange} aria-label="address tabs">
            <Tab 
                label="Tỉnh" 
                disabled={tab < 0} 
                sx={{ 
                fontSize: '12px',  // Chỉnh kích thước chữ nhỏ hơn
                textTransform: 'none'  // Tắt in hoa chữ
                }} 
            />
            <Tab 
                label="Huyện" 
                disabled={tab < 1 || !selectedProvince} 
                sx={{ 
                fontSize: '12px',  
                textTransform: 'none'
                }} 
            />
            <Tab 
                label="Xã" 
                disabled={tab < 2 || !selectedDistrict} 
                sx={{ 
                fontSize: '12px',  
                textTransform: 'none'
                }} 
            />
            </Tabs>


            <FormControl fullWidth >
                {tab === 0 && (
                <Select value={selectedProvince} onChange={handleProvinceSelect} label="Tỉnh">
                    {locations.map((location, index) => (
                    <MenuItem key={index} value={location.province}>
                        {location.province}
                    </MenuItem>
                    ))}
                </Select>
                )}

                {tab === 1 && (
                <Select value={selectedDistrict} onChange={handleDistrictSelect} label="Huyện">
                    {districts.map((district, index) => (
                    <MenuItem key={index} value={district.name}>
                        {district.name}
                    </MenuItem>
                    ))}
                </Select>
                )}

                {tab === 2 && (
                <Select value={selectedWard} onChange={handleWardSelect} label="Xã">
                    {wards.map((ward, index) => (
                    <MenuItem key={index} value={ward}>
                        {ward}
                    </MenuItem>
                    ))}
                </Select>
                )}
                
            </FormControl>

            <Box mb={4}>
                <Typography variant="body1">
                <strong>Địa chỉ đã chọn:</strong> {selectedProvince}, {selectedDistrict}, {selectedWard}
                </Typography>
            </Box>
        </Box>
        <TextField fullWidth id="outlined-basic"  size="small" label="Street name, Building, Home no" variant="outlined" />

        <FormControl sx={{mt:4}}>
            <FormLabel id="demo-radio-buttons-group-label">Label as</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row // Sắp xếp các radio nằm ngang
            >
                <FormControlLabel value="female" control={<Radio />} label="Home" />
                <FormControlLabel value="male" control={<Radio />} label="Work" />
            
            </RadioGroup>
            </FormControl>

      </Box>

      
      <Divider sx={{ marginBottom: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleCloseNewAddress}>Cancel</Button>
        <Button >Confirm</Button>
      </Box>
        </Box>
    </Modal>
    </div>
  );
};

export default Checkout;
