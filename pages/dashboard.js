import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { auth, db } from '../src/firebase/firebase';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemType, setItemType] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editName, setEditName] = useState('');
    const [editQuantity, setEditQuantity] = useState('');
    const [editType, setEditType] = useState('');
    const [subtractQuantity, setSubtractQuantity] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'pantry-items'));
            const itemsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(itemsList);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async () => {
        if (itemName.trim() === '' || itemQuantity.trim() === '' || itemType.trim() === '') return;

        setLoading(true);
        try {
            const docRef = await addDoc(collection(db, 'pantry-items'), {
                name: itemName,
                quantity: itemQuantity,
                type: itemType,
            });
            setItems([...items, { id: docRef.id, name: itemName, quantity: itemQuantity, type: itemType }]);
            setItemName('');
            setItemQuantity('');
            setItemType('');
            setDialogOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateItem = async () => {
        // Ensure all values are strings and trim them
        const name = editName.trim();
        const quantity = String(editQuantity).trim();
        const type = editType.trim();
        const subtract = String(subtractQuantity).trim();

        if (name === '' || (quantity === '' && subtract === '') || type === '') return;

        setLoading(true);
        try {
            const itemRef = doc(db, 'pantry-items', currentItem.id);
            const newQuantity = subtract !== '' ? currentItem.quantity - parseInt(subtract) : parseInt(quantity);

            await updateDoc(itemRef, {
                name,
                quantity: newQuantity,
                type,
            });

            setItems(items.map(item =>
                item.id === currentItem.id
                    ? { ...item, name, quantity: newQuantity, type }
                    : item
            ));
            resetEditDialog();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(db, 'pantry-items', id));
            setItems(items.filter((item) => item.id !== id));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = (item) => {
        setCurrentItem(item);
        setEditName(item.name);
        setEditQuantity(item.quantity);
        setEditType(item.type);
        setSubtractQuantity('');
        setEditDialogOpen(true);
    };

    const resetEditDialog = () => {
        setEditName('');
        setEditQuantity('');
        setEditType('');
        setSubtractQuantity('');
        setCurrentItem(null);
        setEditDialogOpen(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'url(/Screenshot_1.png) no-repeat center center fixed',
                backgroundSize: 'cover',
                p: 3,
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '12px',
                    p: 4,
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
                    width: '100%',
                    maxWidth: '600px',
                    mb: 4,
                }}
            >
                <Typography variant="h2" sx={{ mb: 4, color: '#D4AF37', textAlign: 'center' }}>
                    Pantry Dashboard
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mb: 2, width: '100%', maxWidth: '200px', display: 'block', mx: 'auto' }}
                    onClick={handleLogout}
                >
                    Log Out
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2, width: '100%', maxWidth: '200px', display: 'block', mx: 'auto' }}
                    onClick={() => setDialogOpen(true)}
                >
                    Add Item
                </Button>
                <List sx={{ width: '100%', maxWidth: '600px' }}>
                    {items.map((item) => (
                        <ListItem
                            key={item.id}
                            secondaryAction={
                                <Box>
                                    <IconButton
                                        edge="end"
                                        aria-label="edit"
                                        onClick={() => handleEditClick(item)}
                                        style={{ color: 'white' }}  // Set the color to white
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => deleteItem(item.id)}
                                        style={{ color: 'white' }}  // Set the color to white
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText
                                primary={item.name}
                                secondary={`Quantity: ${item.quantity}, Type: ${item.type}`}
                                sx={{
                                    color: 'white',
                                    '& .MuiListItemText-primary': {
                                        color: 'white',
                                    },
                                    '& .MuiListItemText-secondary': {
                                        color: 'white',
                                    }
                                }}
                            />

                        </ListItem>
                    ))
                    }
                </List >
            </Box >

            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                PaperProps={{
                    style: {
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                    },
                }}
            >
                <DialogTitle>Add New Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={itemQuantity}
                        onChange={(e) => setItemQuantity(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Type"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#000000' }}>
                    <Button
                        variant="contained"
                        onClick={() => setDialogOpen(false)}
                        disabled={loading}
                        sx={{ backgroundColor: '#FFD700', color: '#000000' }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#000000' }} /> : 'Cancel'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={addItem}
                        disabled={loading}
                        sx={{ backgroundColor: '#FFD700', color: '#000000' }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#000000' }} /> : 'Add Item'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={editDialogOpen}
                onClose={resetEditDialog}
                PaperProps={{
                    style: {
                        backgroundColor: '#000000',
                        color: '#FFFFFF',
                    },
                }}
            >
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Item Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Type"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Subtract Quantity"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={subtractQuantity}
                        onChange={(e) => setSubtractQuantity(e.target.value)}
                        sx={{
                            '& .MuiInputLabel-root': { color: '#FFFFFF' },
                            '& .MuiInputBase-input': { color: '#FFFFFF' },
                            '& .MuiInput-underline:before': { borderBottomColor: '#FFFFFF' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#FFFFFF' },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#000000' }}>
                    <Button
                        variant="contained"
                        onClick={resetEditDialog}
                        disabled={loading}
                        sx={{ backgroundColor: '#FFD700', color: '#000000' }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#000000' }} /> : 'Cancel'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={updateItem}
                        disabled={loading}
                        sx={{ backgroundColor: '#FFD700', color: '#000000' }}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: '#000000' }} /> : 'Update Item'}
                    </Button>
                </DialogActions>
            </Dialog>

            {
                loading && (
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CircularProgress />
                    </Box>
                )
            }
        </Box >
    );
};

export default Dashboard;
