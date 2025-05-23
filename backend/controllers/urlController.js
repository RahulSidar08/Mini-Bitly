import { nanoid } from "nanoid";
import { Url } from "../models/urlModel.js";
import { Click } from "../models/clickLogModel.js";
import { UAParser } from "ua-parser-js";
const parser = new UAParser();
import axios from "axios";

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, expirationDate } = req.body;
    const userId = req.id; // Comes from auth middleware
    console.log(userId);
    if (!longUrl) {
      return res.status(400).json({ error: "Please provide the long URL." });
    }

    const shortCode =
      customAlias && customAlias.trim() !== "" ? customAlias.trim() : nanoid(6);

    const existingUrl = await Url.findOne({ shortCode });
    if (existingUrl) {
      return res
        .status(400)
        .json({ error: "The custom alias is already taken." });
    }

    const newUrl = new Url({
      userId,
      longUrl,
      shortCode,
      customAlias: customAlias || undefined,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
    });

    await newUrl.save();

    res.status(201).json({
      message: "Short URL created successfully",
      longUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllUrl = async (req, res) => {
  try {
    let urls = await Url.find();
    if (urls.length === 0) {
      return res.status(200).json({
        success: true,
        message: "There is No Url stored yet ",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Url fetched successfully",
      urls,
    });
  } catch (error) {
    console.log(error);
  }
};

export const urlDetails = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userId = req.id;

    if (!shortCode) {
      return res
        .status(400)
        .json({ success: false, message: "Missing short code" });
    }

    const link = await Url.findOne({ shortCode });

    if (!link || !link.longUrl) {
      return res
        .status(404)
        .json({ success: false, message: "Original URL not found" });
    }

    // Device info
    const parser = new UAParser();
    const ua = parser.setUA(req.headers["user-agent"]).getResult();
    const device = ua.device.type || "Desktop";
    const browser = ua.browser.name || "Unknown";

    // IP address
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Geo info
    const geo = await axios
      .get(`https://ipapi.co/${ip}/json/`)
      .then((res) => res.data)
      .catch(() => ({}));

    await Click.create({
      user_id: userId,
      shortCode,
      clickedAt: new Date(),
      ip,
      device,
      browser,
      location: { country: geo.country_name, city: geo.city },
    });
    return res.redirect(link.longUrl);
  } catch (error) {
    console.log("Error in urlDetails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSingleUrlDetail = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const userId = req.id;

    if (!shortCode)
      return res
        .status(400)
        .json({ success: false, message: "Missing short code" });

    const link = await Click.findOne({ shortCode });

    if (!link) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched Successfully",
      link,
    });
  } catch (error) {
    console.log("Error in urlDetails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
