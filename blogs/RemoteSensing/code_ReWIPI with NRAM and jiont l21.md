---
title: 基于最小秩估计的红外小目标检测
date: 2022-10-20
tags:
 - RemoteSensing
categories:
 -  Search
---

## 基于最小化联合l2,1范数的非凸秩估计的红外小目标检测的相关代码

### 对应matlab代码

```matlab
% 主程序
clc;clear;
close all;

addpath('functions/')
addpath('tools/')
saveDir = 'results/';
imgpath = 'images/';
imgDir = dir([imgpath '*.bmp']);

% patch parameters
patchSize = 40;
slideStep = 40;
lambdaL = 0.7;  %tuning

len = length(imgDir);
% for i=1:len
for i=1:len
    img = imread([imgpath imgDir(i).name]);
    figure,subplot(131)
    imshow(img),title('Original image')

    if ndims( img ) == 3
        img = rgb2gray( img );
    end
    img = double(img);

    %% constrcut patch tensor of original image
    tenD = gen_patch_ten(img, patchSize, slideStep);
    [n1,n2,n3] = size(tenD);  
    
    %% calculate prior weight map
    %      step 1: calculate two eigenvalues from structure tensor
    [lambda1, lambda2] = structure_tensor_lambda(img, 3);
    %      step 2: calculate corner strength function
    cornerStrength = (((lambda1.*lambda2)./(lambda1 + lambda2)));
    %      step 3: obtain final weight map
    maxValue = (max(lambda1,lambda2));
    priorWeight = mat2gray(cornerStrength .* maxValue);
    %      step 4: constrcut patch tensor of weight map
    tenW = gen_patch_ten(priorWeight, patchSize, slideStep);
    
    %% The proposed model
    lambda = lambdaL / sqrt(max(n1,n2)*n3); 
    [tenB,tenT] = trpca_pstnn(tenD,lambda,tenW); 
    
    %% recover the target and background image
    tarImg = res_patch_ten_mean(tenT, img, patchSize, slideStep);
    backImg = res_patch_ten_mean(tenB, img, patchSize, slideStep);

    maxv = max(max(double(img)));
    E = uint8( mat2gray(tarImg)*maxv );
    A = uint8( mat2gray(backImg)*maxv );
    subplot(132),imshow(E,[]),title('Target image')
    subplot(133),imshow(A,[]),title('Background image')
    % save the results
    imwrite(E, [saveDir 'target/' imgDir(i).name]);
    imwrite(A, [saveDir 'background/' imgDir(i).name]);
    
end


% 滑动窗提取Patch
function patchTen = gen_patch_ten(img, patchSize, slideStep)

% 2017-07-31
% This matlab code implements the RIPT model for infrared target-background 
% separation.
%
% Yimian Dai. Questions? yimian.dai@gmail.com
% Copyright: College of Electronic and Information Engineering, 
%            Nanjing University of Aeronautics and Astronautics


if ~exist('patchSize', 'var')
    patchSize = 50;
end

if ~exist('slideStep', 'var')
    slideStep = 10;
end

% img = reshape(1:9, [3 3])
% img = reshape(1:12, [3 4])
% patchSize = 2;
% slideStep = 1;
[imgHei, imgWid] = size(img);

rowPatchNum = ceil((imgHei - patchSize) / slideStep) + 1;
colPatchNum = ceil((imgWid - patchSize) / slideStep) + 1;
rowPosArr = [1 : slideStep : (rowPatchNum - 1) * slideStep, imgHei - patchSize + 1];
colPosArr = [1 : slideStep : (colPatchNum - 1) * slideStep, imgWid - patchSize + 1];

%% arrayfun version, identical to the following for-loop version
[meshCols, meshRows] = meshgrid(colPosArr, rowPosArr);
idx_fun = @(row,col) img(row : row + patchSize - 1, col : col + patchSize - 1);
patchCell = arrayfun(idx_fun, meshRows, meshCols, 'UniformOutput', false);
patchTen = cat(3, patchCell{:});

%% for-loop version
% patchTen = zeros(patchSize, patchSize, rowPatchNum * colPatchNum);
% k = 0;
% for col = colPosArr
%     for row = rowPosArr
%         k = k + 1;
%         tmp_patch = img(row : row + patchSize - 1, col : col + patchSize - 1);
%         patchTen(:, :, k) = tmp_patch;
%     end
% end
end


% 计算结构化张量的特征值
function [lambda_1, lambda_2] = structure_tensor_lambda(img, sz)

G = fspecial('gaussian', [sz sz], 2); % Gaussian kernel
u = imfilter(img, G, 'symmetric');
[Gx, Gy] = gradient(u);

K = fspecial('gaussian', [sz sz], 9); % Gaussian kernel
J_11 = imfilter(Gx.^2, K, 'symmetric'); 
J_12 = imfilter(Gx.*Gy, K, 'symmetric');
J_21 = J_12;
J_22 = imfilter(Gy.^2, K, 'symmetric');   

sqrt_delta = sqrt((J_11 - J_22).^2 + 4*J_12.^2);
lambda_1 = 0.5*(J_11 + J_22 + sqrt_delta);
lambda_2 = 0.5*(J_11 + J_22 - sqrt_delta);

% 计算目标和背景
function [L,S] = trpca_pstnn(X, lambda, tenW, opts)

tol = 1e-3; 
max_iter = 500;
rho = 1.05;
mu = 2*1e-3;
max_mu = 1e10;
DEBUG = 1;
N = rankN(X,0.1);


if ~exist('opts', 'var')
    opts = [];
end    
if isfield(opts, 'tol');         tol = opts.tol;              end
if isfield(opts, 'max_iter');    max_iter = opts.max_iter;    end
if isfield(opts, 'rho');         rho = opts.rho;              end
if isfield(opts, 'mu');          mu = opts.mu;                end
if isfield(opts, 'max_mu');      max_mu = opts.max_mu;        end
if isfield(opts, 'DEBUG');       DEBUG = opts.DEBUG;          end
if isfield(opts, 'N');           N = opts.N;                  end

dim = size(X);
L = zeros(dim);
S = zeros(dim);
Y = zeros(dim);
weightTen = ones(dim);
for iter = 1 : max_iter
    
    preT = sum(S(:) > 0);
    
    % update L
    R = -S+X-Y/mu;
    L = prox_pstnn(R,N,mu);
    
    % update S
    T = -L+X-Y/mu;
    S = prox_l1(T, weightTen*lambda/mu);    
    weightTen = N./ (abs(S) + 0.01)./tenW;
  
    dY = L+S-X;
    err = norm(dY(:))/norm(X(:));
    if DEBUG
        if iter == 1 || mod(iter, 1) == 0            
            disp(['iter ' num2str(iter) ', mu=' num2str(mu) ...
                   ', err=' num2str(err)...
                    ',|T|0 = ' num2str(sum(S(:) > 0))]); 
        end
    end
    currT = sum(S(:) > 0);
    if err < tol || (preT>0 && currT>0 && preT == currT)
        break;
    end 
    Y = Y + dY*mu;
    mu = min(rho*mu,max_mu);    
end


% 估计矩阵的秩
function N = rankN(X, ratioN)
    [~,~,n3] = size(X);
    D = Unfold(X,n3,1);
    [~, S, ~] = svd(D, 'econ');
    [desS, ~] = sort(diag(S), 'descend');
    ratioVec = desS / desS(1);
    idxArr = find(ratioVec < ratioN);
    if idxArr(1) > 1
        N = idxArr(1) - 1;
    else
        N = 1;
    end
end
    
    
% 核范数的优化
function [X] = prox_pstnn(Y,N,mu)

[n1,n2,n3] = size(Y);
X = zeros(n1,n2,n3);
Y = fft(Y,[],3);
tau = 1/mu;


% first frontal slice
[U,S,V] = svd(Y(:,:,1),'econ');
diagS = diag(S);
[desS, sIdx] = sort(diagS, 'descend');
[desU, desV] = deal(U(:, sIdx), V(:, sIdx));
[U1, diagS1, V1] = deal(desU(:, 1:N), desS(1:N), desV(:, 1:N));
[U2, diagS2, V2] = deal(desU(:, N+1:end), desS(N+1:end), desV(:, N+1:end));    
threshS2 = max(diagS2-tau, 0);    
X(:,:,1) = U1*diag(diagS1)*V1' + U2*diag(threshS2)*V2';


% i=2,...,halfn3
halfn3 = round(n3/2);
for i = 2 : halfn3
    [U,S,V] = svd(Y(:,:,i),'econ');
    diagS = diag(S);
    [desS, sIdx] = sort(diagS, 'descend');
    [desU, desV] = deal(U(:, sIdx), V(:, sIdx));
    [U1, diagS1, V1] = deal(desU(:, 1:N), desS(1:N), desV(:, 1:N));
    [U2, diagS2, V2] = deal(desU(:, N+1:end), desS(N+1:end), desV(:, N+1:end));    
    threshS2 = max(diagS2-tau, 0);    
    X(:,:,i) = U1*diag(diagS1)*V1' + U2*diag(threshS2)*V2';
    X(:,:,n3+2-i) = conj(X(:,:,i));
end
  
% if n3 is even
if mod(n3,2) == 0
    i = halfn3+1;
    [U,S,V] = svd(Y(:,:,i),'econ');
    diagS = diag(S);
    [desS, sIdx] = sort(diagS, 'descend');
    [desU, desV] = deal(U(:, sIdx), V(:, sIdx));
    [U1, diagS1, V1] = deal(desU(:, 1:N), desS(1:N), desV(:, 1:N));
    [U2, diagS2, V2] = deal(desU(:, N+1:end), desS(N+1:end), desV(:, N+1:end));    
    threshS2 = max(diagS2-tau, 0);    
    X(:,:,i) = U1*diag(diagS1)*V1' + U2*diag(threshS2)*V2';
end

X = ifft(X,[],3);

end


% 1范数的优化
function x = prox_l1(b,lambda)

x = max(0,b-lambda)+min(0,b+lambda);
x = max(x,0);
end


% 合并面片为图像
function recImg = res_patch_ten_mean(patchTen, img, patchSize, slideStep)

% 2017-07-31
% This matlab code implements the RIPT model for infrared target-background 
% separation.
%
% Yimian Dai. Questions? yimian.dai@gmail.com
% Copyright: College of Electronic and Information Engineering, 
%            Nanjing University of Aeronautics and Astronautics

[imgHei, imgWid] = size(img);

rowPatchNum = ceil((imgHei - patchSize) / slideStep) + 1;
colPatchNum = ceil((imgWid - patchSize) / slideStep) + 1;
rowPosArr = [1 : slideStep : (rowPatchNum - 1) * slideStep, imgHei - patchSize + 1];
colPosArr = [1 : slideStep : (colPatchNum - 1) * slideStep, imgWid - patchSize + 1];

%% for-loop version
accImg = zeros(imgHei, imgWid);
weiImg = zeros(imgHei, imgWid);
k = 0;
onesMat = ones(patchSize, patchSize);
for col = colPosArr
    for row = rowPosArr
        k = k + 1;
        tmpPatch = reshape(patchTen(:, :, k), [patchSize, patchSize]);
        accImg(row : row + patchSize - 1, col : col + patchSize - 1) = tmpPatch;
        weiImg(row : row + patchSize - 1, col : col + patchSize - 1) = onesMat;
    end
end

recImg = accImg ./ weiImg;
end

```



### 根据matlab代码自己写的python代码

```python
import numpy as np
import matplotlib.pyplot as plt
import cv2
import math
import scipy


def init(path):
    pic = plt.imread(path)
    plt.figure()
    plt.subplot(131)
    plt.title('Original')
    if pic.ndim == 2:
        plt.imshow(pic, cmap='gray')
    if pic.ndim == 3:
        plt.imshow(pic)
        pic = cv2.cvtColor(pic, cv2.COLOR_RGB2GRAY)
    pic = np.float64(pic)

    return pic


def gen_patch(pic, patch_size=40, slide_step=40):

    pic_H, pic_W = np.shape(pic)[0:2]

    row_patch_num = math.ceil((pic_H - patch_size) / slide_step + 1)
    col_patch_num = math.ceil((pic_W - patch_size) / slide_step + 1)
    row_pos_arr = list(range(0, slide_step * (row_patch_num - 1), slide_step))
    row_pos_arr.append(pic_H - patch_size)
    col_pos_arr = list(range(0, slide_step * (col_patch_num - 1), slide_step))
    col_pos_arr.append(pic_W - patch_size)

    Patch = np.zeros((patch_size, patch_size, row_patch_num * col_patch_num))
    k = 0
    for j in col_pos_arr:
        for i in row_pos_arr:
            patch_cell = pic[i:i + patch_size, j:j + patch_size]
            Patch[:, :, k] = patch_cell
            k += 1

    return Patch


def res_patch(patch, pic, patch_size=40, slide_step=40):

    pic_H, pic_W = np.shape(pic)[0:2]

    row_patch_num = math.ceil((pic_H - patch_size) / slide_step + 1)
    col_patch_num = math.ceil((pic_W - patch_size) / slide_step + 1)
    row_pos_arr = list(range(0, slide_step * (row_patch_num - 1), slide_step))
    row_pos_arr.append(pic_H - patch_size)
    col_pos_arr = list(range(0, slide_step * (col_patch_num - 1), slide_step))
    col_pos_arr.append(pic_W - patch_size)

    accImg = np.zeros((pic_H, pic_W))
    weiImg = np.zeros((pic_H, pic_W))
    onesMat = np.ones((patch_size, patch_size))
    k = 0
    for j in col_pos_arr:
        for i in row_pos_arr:
            tempPatch = np.reshape(patch[:, :, k], (patch_size, patch_size))
            accImg[i:i+patch_size, j:j+patch_size] = tempPatch
            weiImg[i:i+patch_size, j:j+patch_size] = onesMat
            k += 1

    return accImg / weiImg


def structure_tensor_lambda(pic, size=3):
    Gaussian_kernel = cv2.getGaussianKernel(size, 2) @ cv2.getGaussianKernel(3, 2).T
    u = scipy.ndimage.convolve(pic, Gaussian_kernel)  
    Gx, Gy = np.gradient(u)

    Gaussian_kernel = cv2.getGaussianKernel(size, 9) @ cv2.getGaussianKernel(3, 9).T
    J_11 = scipy.ndimage.convolve(Gx * Gx, Gaussian_kernel)
    J_12 = scipy.ndimage.convolve(Gx * Gy, Gaussian_kernel)
    J_21 = J_12
    J_22 = scipy.ndimage.convolve(Gy * Gy, Gaussian_kernel)

    sqrt_delta = ((J_11 - J_22) ** 2 + 4 * (J_12 ** 2)) ** (1 / 2)
    lambda1 = 0.5 * (J_11 + J_22 + sqrt_delta)
    lambda2 = 0.5 * (J_11 + J_22 - sqrt_delta)

    return lambda1, lambda2


def prox_pstnn(Y, N, mu):
    dim = Y.shape
    X = np.zeros(dim, dtype='complex')
    Y = np.fft.fft(Y)
    tau = 1 / mu

    U, diagS, V = np.linalg.svd(Y[:, :, 0])
    des_S = np.sort(diagS)[::-1]
    idx_S = np.argsort(diagS)[::-1]
    des_U, des_V = U[:, idx_S], V.T[:, idx_S]
    U1, diagS1, V1 = des_U[:, 0:N+1], des_S[0:N+1], des_V[:, 0:N+1]
    U2, diagS2, V2 = des_U[:, N+1:], des_S[N+1:], des_V[:, N+1:]
    threshS2 = np.fmax(diagS2 - tau, 0)
    X[:, :, 0] = U1 @ np.diag(diagS1) @ V1.T + U2 @ np.diag(threshS2) @ V2.T

    half_n3 = round(dim[2] / 2)
    for i in range(1, half_n3 + 1):
        U, diagS, V = np.linalg.svd(Y[:, :, i])
        des_S = np.sort(diagS)[::-1]
        idx_S = np.argsort(diagS)[::-1]
        des_U, des_V = U[:, idx_S], V.T[:, idx_S]
        U1, diagS1, V1 = des_U[:, 0:N+1], des_S[0:N+1], des_V[:, 0:N+1]
        U2, diagS2, V2 = des_U[:, N+1:], des_S[N+1:], des_V[:, N+1:]
        threshS2 = np.fmax(diagS2 - tau, 0)
        X[:, :, i] = U1 @ np.diag(diagS1) @ V1.T + U2 @ np.diag(threshS2) @ V2.T
        X[:, :, dim[2] - i] = np.conj(X[:, :, i])

    if dim[2] % 2 == 0:
        i = half_n3 + 1
        U, diagS, V = np.linalg.svd(Y[:, :, i])
        des_S = np.sort(diagS)[::-1]
        idx_S = np.argsort(diagS)[::-1]
        des_U, des_V = U[:, idx_S], V.T[:, idx_S]
        U1, diagS1, V1 = des_U[:, 0:N+1], des_S[0:N+1], des_V[:, 0:N + 1]
        U2, diagS2, V2 = des_U[:, N+1:], des_S[N+1:], des_V[:, N+1:]
        threshS2 = np.fmax(diagS2 - tau, 0)
        X[:, :, i] = U1 @ np.diag(diagS1) @ V1.T + U2 @ np.diag(threshS2) @ V2.T

    X = np.fft.ifft(X)

    return X.real


def prox_l1(b, lambda_):
    x = np.fmax(0, b - lambda_) + np.fmin(0, b + lambda_)
    x = np.fmax(x, 0)

    return x


def rankN(x, ration_n):

    num3 = np.shape(x)[2]
    re_x = x.reshape(num3, -1, order='F')
    S_diag = np.linalg.svd(re_x)[1]
    des_S = np.sort(S_diag)[::-1]
    ratioVec = des_S / des_S[0]
    idxArr = np.where(ratioVec < ration_n)[0]
    if idxArr[0] > 0:
        N = idxArr[0] - 1
    else:
        N = 0

    return N


def trpca_pstnn(X, lambda_, tenW, tol=1e-3, max_iter=500, rho=1.05, mu=2e-3, max_mu=1e10, debug=None):

    N = rankN(X, 0.1)

    dim = np.shape(X)
    L = np.zeros(dim)
    S = np.zeros(dim)
    Y = np.zeros(dim)
    weightTen = np.ones(dim)

    for iter in range(max_iter):
        preT = np.sum(S > 0)

        R = -S + X - Y / mu
        L = prox_pstnn(R, N, mu)

        T = -L + X - Y / mu
        S = prox_l1(T, weightTen * lambda_ / mu)
        weightTen = N+1 / (np.abs(S) + 0.01) / tenW

        dY = L + S - X
        err = np.linalg.norm(dY) / np.linalg.norm(X)
        currT = np.sum(S[:] > 0)

        if debug:
            print("iter: %d , mu: %.4f, err: %.4f, |T|0: %d" % (iter, mu, err, int(currT)))

        if err < tol or (0 < preT == currT > 0):
            break

        Y = Y + dY * mu
        mu = min(rho * mu, max_mu)

    return L, S


lambdaL = 0.7

img = init("./1.bmp")
D = gen_patch(img)

n1, n2, n3 = D.shape

lambDa1, lambDa2 = structure_tensor_lambda(img)
cornerStrength = (lambDa1 * lambDa2) / (lambDa1 + lambDa2)
maxValue = np.maximum(lambDa1, lambDa2)  
priorWeight = np.zeros(maxValue.shape, np.float64)
cv2.normalize(cornerStrength * maxValue, priorWeight, 1.0, 0.0, cv2.NORM_MINMAX, dtype=cv2.CV_64F)  
W = gen_patch(priorWeight)

lambda0 = lambdaL / math.sqrt(max(n1, n2) * n3)

B, T_ = trpca_pstnn(D, lambda0, W)

tarImg = res_patch(T_, img)
backImg = res_patch(B, img)

maxV = np.max(img)
E = cv2.normalize(tarImg, None, 1, 0, cv2.NORM_MINMAX, dtype=cv2.CV_64F)*maxV
E = E.astype(np.uint8)
A = cv2.normalize(backImg, None, 1, 0, cv2.NORM_MINMAX, dtype=cv2.CV_64F)*maxV
A = A.astype(np.uint8)
plt.subplot(132)
plt.imshow(E, cmap='gray')
plt.title("Target")
plt.subplot(133)
plt.imshow(A, cmap='gray')
plt.title("Background")

plt.show()

```