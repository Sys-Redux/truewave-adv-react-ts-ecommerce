import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Edit2, Save, X, Trash2, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import {
    selectCurrentUser,
    selectAuthLoading,
    selectAuthError,
    updateProfile,
    logout,
} from '../store/authSlice';
import { auth } from '../firebase/config';
import { deleteUser } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';
import { errorfulToast, successfulToast } from '../utils/toasts';