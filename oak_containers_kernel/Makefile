all: target/vmlinux

target/vmlinux: target/bzImage
	target/linux-6.1.33/scripts/extract-vmlinux  target/bzImage > target/vmlinux


target/bzImage: target/linux-6.1.33 configs/6.1.33/minimal.config
	KCONFIG_CONFIG=../../configs/6.1.33/minimal.config $(MAKE) -C target/linux-6.1.33 bzImage -j `nproc`
	cp target/linux-6.1.33/arch/x86/boot/bzImage target/bzImage

target/linux-6.1.33:
	mkdir -p target
	curl -O -L --output-dir target https://cdn.kernel.org/pub/linux/kernel/v6.x/linux-6.1.33.tar.xz
	tar -C target -Jxf target/linux-6.1.33.tar.xz
