import {AssetServerPlugin, configureS3AssetStorage,} from "@vendure/asset-server-plugin";
import {DefaultAssetNamingStrategy} from "@vendure/core";
import path from "path";
import {fromNodeProviderChain} from "@aws-sdk/credential-providers";
import {getEnvs} from "../../getEnvs";

const region = process.env.AWS_REGION || "us-east-2";
const credentials = fromNodeProviderChain({
	...(process.env.AWS_PROFILE && {profile: process.env.AWS_PROFILE}),
	clientConfig: {region},
});
const nativeS3Configuration = {region, credentials};
const {S3_BUCKET: bucket} = getEnvs();

export const AssetsPlugin = AssetServerPlugin.init({
	route: "assets",
	assetUploadDir: path.join(__dirname, "assets"),
	namingStrategy: new DefaultAssetNamingStrategy(),
	/* storageStrategyFactory: configureS3AssetStorage({
	  bucket,
	  credentials,
	  nativeS3Configuration,
	}), */
	storageStrategyFactory: configureS3AssetStorage({
		bucket: 'productshare',
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
		},
		nativeS3Configuration: {region: process.env.AWS_REGION,},
	}),
});
